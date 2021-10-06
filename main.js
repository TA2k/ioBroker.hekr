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
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        // Reset the connection indicator during startup
        this.setState("info.connection", false, true);

        this.requestClient = axios.create();

        this.reLoginTimeout = null;
        this.refreshTokenTimeout = null;
        this.json2iob = new Json2iob(this);
        this.deviceArray = [];

        this.subscribeStates("*");

        await this.login();

        if (this.session.token) {
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
                for (const device of res.data) {
                    this.deviceArray.push({ devTid: device.ctrlKey });
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
            this.log.debug("WS open");
            this.ws.send(JSON.stringify(this.wsAuthMessage));
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
            }
            this.heartbeatInterval = setInterval(() => {
                this.ws.send(JSON.stringify({ msgId: 53, action: "heartbeat" }));
            }, 30 * 1000); // 30se
        });

        this.ws.on("message", async (message) => {
            this.log.debug("WS received:" + message);
            if (this.wsHeartbeatTimeout) {
                clearTimeout(this.wsHeartbeatTimeout);
            }
            this.wsHeartbeatTimeout = setTimeout(() => {
                this.log.info("Lost WebSocket connection. Reconnect WebSocket");
                this.ws.close();
                setTimeout(() => {
                    this.connectToWS();
                }, 2000);
            }, 1 * 70 * 1000); //1min
            try {
                const jsonMessage = JSON.parse(message);

                if (jsonMessage.action === "devSend") {
                    const params = jsonMessage.params;
                    this.json2iob.parse(params.devTid + ".status", params.data);
                    if (params.data.raw) {
                        for (let n = 0; n < params.data.raw.length; n += 2) {
                            const index = n / 2;
                            await this.setObjectNotExistsAsync(params.devTid + ".status.rawData.value" + index, {
                                type: "state",
                                common: {
                                    role: "value",
                                    type: "number",
                                    write: false,
                                    read: false,
                                },
                                native: {},
                            });

                            this.setState(params.devTid + ".status.rawData.value" + index, parseInt(params.data.raw.substr(n, 2), 16), true);
                        }
                    }
                }
            } catch (error) {
                this.log.error(error);
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
                const ctrlKey = this.deviceArray[deviceId];
                const states = await this.getStatesAsync(pre + ".deviceId.data.rawData");
                const allIds = Object.keys(states);
                let rawString = "";
                states.forEach((element) => {
                    rawString += element.val.toString(16);
                });
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
            }
        }
    }
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
