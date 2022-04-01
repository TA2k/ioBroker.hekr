"use strict";

/*
 * Created with @iobroker/create-adapter v2.0.1
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");
const Json2iob = require("./lib/json2iob");
const axios = require("axios");
const WebSocket = require("ws");
const udpSocket = require("dgram");

class Hekr extends utils.Adapter {
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: "hekr",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        this.on("unload", this.onUnload.bind(this));
        this.reLoginTimeout = null;
        this.refreshTokenTimeout = null;
        this.json2iob = new Json2iob(this);
        this.deviceDict = {};
        this.deviceMode = {};
        this.devicelanIp = {};

        this.devicemodel = {};
        this.check = null;
        this.c_update = 0;

        this.session = {};
        //Ge�ndert Anfang
        this.tplkkl = { sw: 2, light_Sw: 3, speed: 4, tm_Minutes: 5, cleaning: 6, R: 7, B: 7, G: 7, rgb: 7, hour: 8, minute: 8, second: 8, time: 8, RGB_Sw: 9, raw_manually: 20 };
        //Ge�ndert Ende
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        // Reset the connection indicator during startup
        this.setState("info.connection", false, true);

        this.requestClient = axios.create();

        this.subscribeStates("*");

        await this.login();

        if (this.session.access_token) {
            await this.getDeviceList();
            await this.connectToWS();

            this.refreshTokenInterval = setInterval(() => {
                this.login();
            }, this.session.expires_in * 1000); //1hour
        }
    }
    async login() {
        await this.requestClient({
            method: "post",
            url: "https://uaa-openapi.hekreu.me/login",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",

                "Accept-Language": "de",
            },
            data: JSON.stringify({
                username: this.config.username,
                password: this.config.password,
                clientType: "IOS",
                appLoginInfo: {
                    id: "88D7F8EA-BA57-4046-8F79-D184085D013A",
                    os: "15.1",
                    type: "iPhone13,3",
                    appVersion: "1.8.9",
                    name: "Wisen",
                },
                pid: "00000000000",
            }),
        })
            .then((res) => {
                this.log.debug(JSON.stringify(res.data));

                this.setState("info.connection", true, true);
                this.log.info("Login successful");
                this.session = res.data;
            })
            .catch((error) => {
                this.log.error(error);
                if (error.response) {
                    this.log.error(JSON.stringify(error.response.data));
                }
            });
    }

    async getDeviceList() {
        await this.requestClient({
            method: "get",
            url: "https://user-openapi.hekreu.me/device?&page=0&size=20",
            headers: {
                Accept: "*/*",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                "Accept-Language": "de",
                Authorization: "Bearer " + this.session.access_token,
            },
        })
            .then(async (res) => {
                this.log.debug(JSON.stringify(res.data));
                this.log.info(res.data.length + " devices found.");
                for (const device of res.data) {
                    this.deviceDict[device.devTid] = device.ctrlKey;
                    this.deviceMode[device.devTid] = device.workModeType;
                    this.devicelanIp[device.devTid] = device.lanIp;
                    //Neu Anfang
                    this.devicemodel[device.devTid] = device.model;
                    //Neu Ende
                    const productPubKey = device.productPublicKey;
                    const DevID = device.devTid;
                    await this.setObjectNotExistsAsync(device.devTid, {
                        type: "device",
                        common: {
                            name: device.deviceName,
                        },
                        native: {},
                    });

                    await this.setObjectNotExistsAsync(device.devTid + ".general", {
                        type: "channel",
                        common: {
                            name: "General Information",
                        },
                        native: {},
                    });
                    await this.setObjectNotExistsAsync(device.devTid + ".status", {
                        type: "channel",
                        common: {
                            name: "Status values",
                        },
                        native: {},
                    });

                    this.json2iob.parse(device.devTid + ".general", device);

                    await this.setObjectNotExists(device.devTid + ".status.rgb", {
                        //Workaround fuer Farben
                        type: "state",
                        common: {
                            name: "rgb",
                            type: "string",
                            read: true,
                            write: true,
                            role: "level.color.rgb",
                            desc: "Fuer Alexa IOT",
                        },
                        native: {},
                    });
                    //Neu Anfang
                    await this.setObjectNotExists(device.devTid + ".status.raw_manually", {
                        //RAW versenden
                        type: "state",
                        common: {
                            name: "raw_manually",
                            type: "string",
                            read: true,
                            write: true,
                            role: "indicator.status",
                            desc: "Sent manually raw",
                        },
                        native: {},
                    });
                    //Neu Ende
                    await this.setObjectNotExists(device.devTid + ".status.time", {
                        //Button für aktuelle Zeit senden
                        type: "state",
                        common: {
                            name: "time",
                            type: "boolean",
                            read: false,
                            write: true,
                            role: "button",
                            def: false,
                            desc: "Button fuer aktuelle Zeit zu senden",
                        },
                        native: {},
                    });

                    await this.requestClient({
                        method: "get",
                        url: "https://console-openapi.hekreu.me/external/device/protocolTemplate",
                        headers: {
                            Accept: "*/*",
                            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                            "Accept-Language": "de",
                            "X-Hekr-ProdPubKey": productPubKey,
                            Authorization: "Bearer " + this.session.access_token,
                        },
                    })
                        .then(async (res) => {
                            this.log.debug(JSON.stringify(res.data));
                            this.log.info("1 template found.");

                            await this.setObjectNotExistsAsync(DevID + ".template", {
                                type: "channel",
                                common: {
                                    name: "Template",
                                },
                                native: {},
                            });

                            this.json2iob.parse(DevID + ".template", res.data);
                        })
                        .catch((error) => {
                            this.log.error(error);
                            error.response && this.log.error(JSON.stringify(error.response.data));
                        });
                }
            })
            .catch((error) => {
                this.log.error(error);
                error.response && this.log.error(JSON.stringify(error.response.data));
            });
    }

    async connectToWS() {
        if (this.ws) {
            this.ws.close();
        }
        this.ws = new WebSocket("wss://fra-hub.hekreu.me:186", {
            perMessageDeflate: false,
        });
        this.wsAuthMessage = {
            msgId: 52,
            action: "appLogin",
            params: {
                appTid: "E897DCA2-0D8A-4531-AC91-9BC0900318D9",
                token: this.session.access_token,
            },
        };
        this.ws.on("open", () => {
            //this.log.debug("WS received:" + message);
            //Neu Anfang
            this.setState("info.connection", true, true);
            //Neu Ende
            try {
                this.log.debug("WS open");
                this.ws.send(JSON.stringify(this.wsAuthMessage));
                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                }
                this.heartbeatInterval = setInterval(() => {
                    this.ws.send(JSON.stringify({ msgId: 53, action: "heartbeat" }));
                }, 10 * 1000); // 30se
            } catch (error) {
                this.log.error(error);
            }
        });

        this.ws.on("message", async (message) => {
            if (this.wsHeartbeatTimeout) {
                clearTimeout(this.wsHeartbeatTimeout);
            }
            this.wsHeartbeatTimeout = setTimeout(() => {
                this.log.info("Lost WebSocket connection. Reconnect WebSocket");
                this.ws.close();
                setTimeout(() => {
                    this.connectToWS();
                }, 2000);
            }, 70 * 1000); //1min
            try {
                const jsonMessage = JSON.parse(message);

                if (jsonMessage.action === "devSend") {
                    const params = jsonMessage.params;
                    //Neu Anfang
                    if (this.c_update === 0) this.check = params.data;
                    ++this.c_update;
                    //Neu Ende
                    //Ge�ndert Anfang
                    if (Object.keys(params.data).length > 1 && this.c_update > 3) {
                        this.log.debug("WS received:" + message);
                        this.c_update = 1;
                        Object.keys(params.data).forEach((n) => {
                            if (this.check[n] !== params.data[n]) this.setState(params.devTid + ".status." + n, params.data[n], true);
                        });
                        this.check = params.data;
                        //this.json2iob.parse(params.devTid + ".status", params.data, { write: true });
                    }
                    //Ge�ndert Ende
                    // if (params.data.raw) {
                    //     for (let n = 0; n < params.data.raw.length; n += 2) {
                    //         const index = n / 2;
                    //         await this.setObjectNotExistsAsync(params.devTid + ".status.rawData.value" + index, {
                    //             type: "state",
                    //             common: {
                    //                 role: "value",
                    //                 type: "number",
                    //                 write: false,
                    //                 read: false,
                    //             },
                    //             native: {},
                    //         });

                    //         this.setState(params.devTid + ".status.rawData.value" + index, parseInt(params.data.raw.substr(n, 2), 16), true);
                    //     }
                    // }
                } else {
                    this.log.debug("WS received:" + message);
                }
            } catch (error) {
                this.log.error("Test: " + error);
            }
        });

        this.ws.on("close", (data) => {
            this.log.debug(data);
            this.setState("info.connection", false, true);
            this.log.debug("Websocket closed");
        });
        this.ws.on("error", (err) => {
            this.log.error("websocket error: " + err);
        });
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            this.setState("info.connection", false, true);
            clearInterval(this.heartbeatInterval);
            clearInterval(this.wsHeartbeatTimeout);
            clearInterval(this.refreshTokenInterval);
            callback();
        } catch (e) {
            callback();
        }
    }
    DecToHex(d) {
        const hex = d.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    /**
     * Is called if a subscribed state changes
     * @param {string} id
     * @param {ioBroker.State | null | undefined} state
     */

    async onStateChange(id, state) {
        if (state) {
            if (!state.ack) {
                const pre = this.name + "." + this.instance;
                const deviceId = id.split(".")[2];
                const command = id.split(".")[4];
                let rawString = "NOTFOUND";
                const ctrlKey = this.deviceDict[deviceId];
                const workMode = this.deviceMode[deviceId];
                const lanIp = this.devicelanIp[deviceId];
                //Neu Anfang
                const model = this.devicemodel[deviceId];
                this.log.debug("Model: " + model);
                //Neu Ende
                if (command == "B" || command == "G" || command == "R") {
                    this.log.info("For color use datapoint rgb");
                    return;
                }

                if (!this.tplkkl[command]) {
                    this.log.info("Command " + command + " not implemented");
                    return;
                }

                rawString = this.tplkkl[command];
                //Ge�ndert Anfang
                if (command === "raw_manually") {
                    const checkRaw = await this.checkObject(this.namespace + "." + deviceId + ".status.raw");
                    if (checkRaw === 1) {
                        const devRaw = await this.getStateAsync(deviceId + ".status.raw");
                        rawString = state.val;
                        //this.log.debug("RAW: " + "4810010A010000000000009B726D00DE".replace(/(.{13}).{2}/,"$112"));
                    } else {
                        this.log.info("Cannot read dp raw");
                        return;
                    }
                } else if (command === "RGB_Sw" && (state.val === 1 || state.val === 0)) {
                    this.log.debug("Command RGB_Sw: " + state.val);
                    this.log.info("Command " + command + " not implemented");
                    return;
                } else if (command === "rgb") {
                    let rgbstr = state.val;
                    if (rgbstr && rgbstr.length == 7) {
                        rgbstr = rgbstr.replace("#", "");
                    } else if (rgbstr && rgbstr.length != 6) {
                        this.log.info("The color " + command + " is not a hex");
                        return;
                    }
                    rawString = "48090200" + this.DecToHex(rawString) + rgbstr + "00";
                    //Ge�ndert Ende
                } else if (command == "time") {
                    const a = new Date();
                    rawString = "48090200" + this.DecToHex(rawString) + this.DecToHex(a.getHours()) + this.DecToHex(a.getMinutes()) + this.DecToHex(a.getSeconds()) + "00";
                } else {
                    rawString = "48070200" + this.DecToHex(rawString) + this.DecToHex(state.val) + "00";
                }

                this.log.debug("Command " + rawString);
                if (this.config.useudpremote && lanIp !== undefined) {
                    const datajson = JSON.stringify({
                        action: "appSend",
                        msgId: 1,
                        params: {
                            appTid: "E897DCA2-0D8A-4531-AC91-9BC0900318D9",
                            devTid: deviceId,
                            ctrlKey: ctrlKey,
                            data: { raw: rawString },
                        },
                    });
                    const message = new Buffer(datajson);
                    const client = udpSocket.createSocket("udp4");
                    client.send(message, 0, message.length, 10000, lanIp, (err, bytes) => {
                        if (err) {
                            this.log.error(err.toString());
                        }
                        client.close();
                    });
                    this.log.debug("Sent remote");
                    return;
                }
                if (workMode == "JSON_TRANSPARENT") {
                    this.ws.send(
                        JSON.stringify({
                            msgId: 65,
                            action: "appSend",
                            params: {
                                appTid: "E897DCA2-0D8A-4531-AC91-9BC0900318D9",
                                data: { raw: rawString },
                                devTid: deviceId,
                                ctrlKey: ctrlKey,
                            },
                        })
                    );
                } else {
                    this.ws.send(
                        JSON.stringify({
                            msgId: 65,
                            action: "appSend",
                            params: {
                                appTid: "E897DCA2-0D8A-4531-AC91-9BC0900318D9",
                                data: {
                                    cmdId: 1,
                                    command: state.val,
                                },
                                devTid: deviceId,
                                ctrlKey: ctrlKey,
                            },
                        })
                    );
                }
            }
        }
    }
    //Neu Anfang
    /**
     * Is channel or device exists
     * @param {string} channel => path
     */
    checkObject(channel) {
        return new Promise((resolve) => {
            this.getForeignObjects(channel, (err, obj) => {
                if (err) {
                    this.log.debug("Read Object: " + err);
                    resolve(0);
                } else {
                    try {
                        resolve(1);
                    } catch (e) {
                        resolve(0);
                    }
                }
            });
        });
    }
    //Neu Ende
}

if (require.main !== module) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new Hekr(options);
} else {
    // otherwise start the instance directly
    new Hekr();
}
