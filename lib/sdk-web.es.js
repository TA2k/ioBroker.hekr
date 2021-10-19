// import axios from 'axios';

var URL = {
  ws: 'wss://asia-app.hekr.me:186',
  uaa: 'https://uaa-openapi.hekr.me',
  user: 'https://user-openapi.hekr.me',
  console: 'https://console-openapi.hekr.me'
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var getURL = function () {
  var h = this;

  return _extends({}, URL, h.options.matrix.URL);
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = 'object' === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

var getDevice = asyncToGenerator(regenerator.mark(function _callee() {
  var h, device;
  return regenerator.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          h = this;
          _context.t0 = h.options.device;

          if (_context.t0) {
            _context.next = 6;
            break;
          }

          _context.next = 5;
          return h.fetch.device({
            devTid: h.options.devTid,
            subDevTid: h.options.subDevTid
          });

        case 5:
          _context.t0 = _context.sent;

        case 6:
          device = _context.t0;
          return _context.abrupt("return", _extends({
            subDevTid: h.options.subDevTid
          }, device));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

var getOptions = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      devTid = _ref.devTid,
      subDevTid = _ref.subDevTid,
      device = _ref.device,
      protocol = _ref.protocol,
      matrix = _ref.Matrix,
      _ref$query = _ref.query,
      query = _ref$query === undefined ? {} : _ref$query,
      _ref$decode = _ref.decode,
      decode = _ref$decode === undefined ? function (raw) {
    return raw;
  } : _ref$decode,
      _ref$encode = _ref.encode,
      encode = _ref$encode === undefined ? function (data) {
    return data.raw;
  } : _ref$encode;

  return {
    devTid: devTid,
    subDevTid: subDevTid,
    device: device,
    protocol: protocol,
    matrix: matrix,
    token: matrix.token,
    query: _extends({
      frame: {
        cmdId: 0
      },
      duration: 30,
      auto: true,
      timeService: [],
      fn: function fn(frame) {
        return frame;
      } }, query),
    decode: decode,
    encode: encode };
};

var getProtocol = asyncToGenerator(regenerator.mark(function _callee() {
  var h, protocol;
  return regenerator.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          h = this;
          _context.t0 = h.options.protocol;

          if (_context.t0) {
            _context.next = 6;
            break;
          }

          _context.next = 5;
          return h.fetch.protocol();

        case 5:
          _context.t0 = _context.sent;

        case 6:
          protocol = _context.t0;
          return _context.abrupt("return", protocol);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

var on = function (event, fn) {
  if (!this['[[EVENTS]]']) {
    this['[[EVENTS]]'] = {};
  }
  if (!this['[[EVENTS]]'][event]) {
    this['[[EVENTS]]'][event] = [];
  }
  this['[[EVENTS]]'][event].push(fn);
  return this;
};

var once = function (event, fn) {
  if (!this['[[EVENTS]]']) {
    this['[[EVENTS]]'] = {};
  }
  function on() {
    this.off(event, on);
    fn.apply(undefined, arguments);
  }
  on.fn = fn;
  this.on(event, on);

  return this;
};

var off = function (event, fn) {
  if (!this['[[EVENTS]]']) {
    this['[[EVENTS]]'] = {};
  }
  if (event == null) {
    this['[[EVENTS]]'] = {};
  } else {
    var fns = this['[[EVENTS]]'][event];

    if (fns) {
      if (fn == null) {
        this['[[EVENTS]]'][event] = [];
      } else {
        var index = fns.findIndex(function (f) {
          return f === fn || f.fn === fn;
        });

        if (index > -1) {
          fns.splice(index, 1);
        }
      }
    }
  }
  return this;
};

var emit = function (event) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!this['[[EVENTS]]']) {
    this['[[EVENTS]]'] = {};
  }
  var fns = this['[[EVENTS]]'][event];

  if (fns) {
    fns.forEach(function (fn) {
      return fn.apply(undefined, args);
    });
  }

  return this;
};

var axios$1 = function (h) {
  var fetch = axios.create({
    baseURL: h.URL.user,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + h.options.token,
      'Content-Type': 'application/json'
    },
    timeout: 20000
  });

  return fetch;
};

var _this = window;

var index$2 = (function (h) {
  return asyncToGenerator(regenerator.mark(function _callee() {
    var devices;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return h.fetch.get('/device', {
              params: {
                devTid: h.options.devTid
              }
            });

          case 2:
            devices = _context.sent;
            return _context.abrupt('return', (devices.data || [])[0]);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));
});

var _this$1 = window;

var index$3 = (function (h) {
  return asyncToGenerator(regenerator.mark(function _callee() {
    var protocol;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return h.fetch.get('/external/device/protocolTemplate', {
              baseURL: h.URL.console,
              headers: {
                'X-Hekr-ProdPubKey': h.device.productPublicKey
              }
            });

          case 2:
            protocol = _context.sent;
            return _context.abrupt('return', protocol.data);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$1);
  }));
});

var getURL$1 = (function (device) {
  var _device$dcInfo = device.dcInfo,
      dcInfo = _device$dcInfo === undefined ? {
    fromDC: 'gz',
    fromArea: 'asia'
  } : _device$dcInfo;

  var fromDC = dcInfo.fromDC === 'gz' ? '' : dcInfo.fromDC === 'test-gz' ? 'test-' : dcInfo.fromDC + '-';
  var fromArea = dcInfo.fromArea === 'asia' ? '' : dcInfo.fromArea;
  return 'https://' + fromDC + 'user-openapi.hekr' + fromArea + '.me';
});

var _this$2 = window;

var get$1 = (function (h) {
  return asyncToGenerator(regenerator.mark(function _callee() {
    var tasks;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return h.fetch.get('/rule/schedulerTask', {
              baseURL: getURL$1(h.device),
              params: {
                devTid: h.device.devTid,
                subDevTid: h.device.subDevTid,
                ctrlKey: h.device.ctrlKey
              }
            });

          case 2:
            tasks = _context.sent;
            return _context.abrupt('return', tasks.data);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this$2);
  }));
});

var padStart = (function (target) {
  var targetLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var padString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';

  var length = targetLength - String(target).length;

  if (length < 0) length = 0;

  var startPad = new Array(length + 1).join(padString);

  return startPad + target;
});

var formatTime = (function () {
  var date = new Date();

  var h = padStart(date.getHours());
  var m = padStart(date.getMinutes());
  var s = padStart(date.getSeconds());
  var ms = padStart(date.getMilliseconds(), 3);

  return h + ':' + m + ':' + s + '.' + ms;
});

var padEnd = (function (target) {
  var targetLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var padString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';

  var length = targetLength - String(target).length;

  if (length < 0) length = 0;

  var endPad = new Array(length + 1).join(padString);

  return target + endPad;
});

function select(action, choices) {
  var choice = choices[action] || choices['defaults'];

  var result = void 0;

  try {
    result = choice.call();
  } catch (e) {
    throw e;
  }

  return result;
}

var _this$3 = window;

var set$1 = (function (h) {
  return function () {
    var _ref2 = asyncToGenerator(regenerator.mark(function _callee(_ref) {
      var taskId = _ref.taskId,
          _ref$taskName = _ref.taskName,
          taskName = _ref$taskName === undefined ? '未命名' : _ref$taskName,
          _ref$desc = _ref.desc,
          desc = _ref$desc === undefined ? '备注' : _ref$desc,
          code = _ref.code,
          date = _ref.date,
          _ref$enable = _ref.enable,
          enable = _ref$enable === undefined ? true : _ref$enable;

      var task, hour, minute, _date$second, second, _date$repeatList, repeatList, expectDate, expectTimestamp, oneDay, tasks;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              task = {
                taskName: taskName,
                code: h.encode(code),
                timeZoneOffset: -new Date().getTimezoneOffset(),
                desc: desc,
                enable: enable
              };


              if (taskId != null) task.taskId = taskId;

              if (h.device.subDevTid) task.subDevTid = h.device.subDevTid;

              if (date instanceof Date) {
                task.schedulerType = 'ONCE';
                task.triggerDateTime = jetlag(date);
              } else {
                hour = date.hour, minute = date.minute, _date$second = date.second, second = _date$second === undefined ? 0 : _date$second, _date$repeatList = date.repeatList, repeatList = _date$repeatList === undefined ? [] : _date$repeatList;


                if (repeatList.length) {
                  task.schedulerType = 'LOOP';
                  task.triggerTime = [hour, minute, second].map(function (time) {
                    return padStart(time);
                  }).join(':');
                  task.repeatList = repeatList;
                } else {
                  task.schedulerType = 'ONCE';

                  expectDate = new Date();


                  expectDate.setHours(hour);
                  expectDate.setMinutes(minute);
                  expectDate.setSeconds(second);

                  expectTimestamp = expectDate.getTime();


                  if (expectTimestamp <= Date.now()) {
                    oneDay = 1000 * 60 * 60 * 24;


                    expectDate = new Date(expectTimestamp + oneDay);
                  }

                  task.triggerDateTime = jetlag(expectDate);
                }
              }

              _context.next = 6;
              return h.fetch.put('/rule/schedulerTask', task, {
                baseURL: getURL$1(h.device),
                params: {
                  devTid: h.device.devTid,
                  subDevTid: h.device.subDevTid,
                  ctrlKey: h.device.ctrlKey
                }
              });

            case 6:
              tasks = _context.sent;
              return _context.abrupt('return', tasks.data);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this$3);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
});

function jetlag(date) {
  var timestamp = date.getTime();

  var offset = -date.getTimezoneOffset() * 60 * 1000;

  var offsetDate = new Date(timestamp + offset);

  var formatted = JSON.stringify(offsetDate).slice(1, -6);

  return formatted;
}

var _this$4 = window;

var del = (function (h) {
  return function () {
    var _ref = asyncToGenerator(regenerator.mark(function _callee(task) {
      var tasks;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return h.fetch.delete('/rule/schedulerTask', {
                baseURL: getURL$1(h.device),
                params: {
                  devTid: h.device.devTid,
                  subDevTid: h.device.subDevTid,
                  ctrlKey: h.device.ctrlKey,
                  taskId: task ? task.taskId : null
                }
              });

            case 2:
              tasks = _context.sent;
              return _context.abrupt('return', tasks.data);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this$4);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
});

var next = (function (h) {
  return function (tasks) {
    if (!tasks || !tasks.length) {
      return null;
    }
    var next = tasks.filter(function (_ref) {
      var enable = _ref.enable,
          expired = _ref.expired;
      return enable && !expired;
    }).sort(function (a, b) {
      return a.nextTriggerTime - b.nextTriggerTime;
    })[0] || {};

    if (!next.taskId && next.taskId !== 0) {
      return null;
    }

    var subtractTime = next.nextTriggerTime - Date.now() > 0 ? next.nextTriggerTime - Date.now() : 0;
    var hour = Math.floor(subtractTime / 3600000);
    var minute = Math.floor((subtractTime - hour * 3600000) / 1000 / 60);
    var second = Math.floor((subtractTime - hour * 3600000 - minute * 60000) / 1000);

    return {
      hour: hour,
      minute: minute,
      second: second,
      next: next
    };
  };
});

var format = (function (h) {
  return function (tasks) {
    var schedulerTasks = tasks.filter(function (_ref) {
      var subDevTid = _ref.subDevTid;
      return subDevTid == h.device.subDevTid;
    }).map(function (task) {
      var formatting = {
        taskId: task.taskId,
        taskName: task.taskName,
        desc: task.desc,
        enable: task.enable,
        expired: task.expired,
        code: h.decode(task.code),
        nextTriggerTime: task.nextTriggerTime,
        schedulerType: task.schedulerType,
        date: {}
      };

      select(task.schedulerType, {
        ONCE: function ONCE() {
          formatting.triggerDateTime = task.triggerDateTime;

          if (task.cronExpr) {
            var cron = task.cronExpr.split(' ').map(function (n) {
              return +n;
            });

            var _cron = slicedToArray(cron, 7),
                second = _cron[0],
                minute = _cron[1],
                hour = _cron[2],
                day = _cron[3],
                month = _cron[4],
                year = _cron[6];

            var timeZoneOffset = (task.timeZoneOffset + new Date().getTimezoneOffset()) * 60 * 1000;
            var timestamp = new Date(year, month - 1, day, hour, minute, second).getTime() - timeZoneOffset;
            var time = new Date(timestamp);

            formatting.date = {
              year: time.getFullYear(),
              month: time.getMonth() + 1,
              day: time.getDate(),
              hour: time.getHours(),
              minute: time.getMinutes(),
              second: time.getSeconds()
            };
          }
        },
        LOOP: function LOOP() {
          formatting.triggerTime = task.triggerTime;
          var repeatList = task.repeatList || [];

          if (task.cronExpr) {
            var cron = task.cronExpr.split(' ').map(function (n) {
              return +n;
            });

            var _cron2 = slicedToArray(cron, 3),
                second = _cron2[0],
                minute = _cron2[1],
                hour = _cron2[2];

            var timeZoneOffset = (task.timeZoneOffset + new Date().getTimezoneOffset()) * 60 * 1000;
            var datatime = new Date();
            var timestamp = new Date(datatime.getFullYear(), datatime.getMonth(), datatime.getDate(), hour, minute, second).getTime() - timeZoneOffset;
            var time = new Date(timestamp);

            formatting.date = {
              hour: time.getHours(),
              minute: time.getMinutes(),
              second: time.getSeconds(),
              repeatList: repeatList
            };
          }
        }
      });

      return formatting;
    });

    return schedulerTasks;
  };
});

var index$4 = (function (h) {
  return {
    get: get$1(h),
    set: set$1(h),
    del: del(h),
    next: next(h),
    format: format(h)
  };
});



var inject$2 = Object.freeze({
	device: index$2,
	protocol: index$3,
	schedulerTask: index$4
});

var index$1 = function () {
  var h = this;

  h.fetch = axios$1(h);

  Object.keys(inject$2).forEach(function (key) {
    h.fetch[key] = inject$2[key](h);
  });

  return h;
};

var loadingTimer = [];
var loadendTimer = [];
var isClearLoading = true;

var isQuery = false;

var setIsQuery = function setIsQuery() {
  isQuery = true;
};

var show = function show(h) {
  if (isQuery) {
    isQuery = false;
    return;
  }
  if (isClearLoading) {
    clear();
    isClearLoading = false;
  }
  loadingTimer.push(setTimeout(function () {
    h.emit('loading', true);
    isClearLoading = true;
  }, (h.delay || 5000) / 3));

  loadendTimer.push(setTimeout(function () {
    clear();
    isClearLoading = true;
    h.emit('loading', false);
  }, h.delay || 5000));
};

var hide = function hide(h) {
  clear();
  isClearLoading = true;
  h.emit('loading', false);
};

var clear = function clear() {
  while (loadingTimer.length) {
    clearTimeout(loadingTimer.pop());
  }
  while (loadendTimer.length) {
    clearTimeout(loadendTimer.pop());
  }
};

var colors = {
  info: {
    action: '#4caf50',
    description: '#03a9f4',
    frame: '#4caf50',
    data: '#03a9f4'
  },
  error: {
    action: '#f20404',
    description: '#f20404',
    frame: '#f20404',
    data: '#f20404'
  }
};

var log = (function (level, title, response, description, data) {
  var _console;

  var color = colors[level];

  var action = padEnd(response.action, 11);
  var time = formatTime();

  var groupTitle = '%c' + title + ' %c' + action + ' %c@ ' + time;

  if (description) {
    groupTitle += ' %c' + description;
  }

  var groupTitleCSS = ['color: gray; font-weight: lighter;', 'color: ' + color.action + '; font-weight: lighter;', 'color: gray; font-weight: lighter;'];

  if (description) {
    groupTitleCSS.push('color: ' + color.description + '; font-weight: lighter;');
  }

  (_console = console).groupCollapsed.apply(_console, [groupTitle].concat(groupTitleCSS));

  console.log('%cframe', 'color: ' + color.frame, response);

  if (data) {
    console.log('%cdata ', 'color: ' + color.data, data);
  }

  console.groupEnd();
});

function handleData(h, response) {
  var action = response.action,
      _response$params = response.params,
      devTid = _response$params.devTid,
      subDevTid = _response$params.subDevTid,
      data = _response$params.data;

  if (devTid === h.device.devTid && subDevTid == h.device.subDevTid) {
    var decoded = h.decode(data);

    var command = '';

    if (decoded.cmdTag != null) {
      command = String(decoded.cmdTag);
    } else if (decoded.cmdId != null) {
      command = String(decoded.cmdId);
    }

    log('info', 'receive', response, command, decoded);

    var cmdTag = decoded.cmdTag;

    h.emit('devSend', decoded);

    if (cmdTag) {
      if (action === 'devSend') {
        hide(h);
      }
      h.emit(cmdTag, decoded);
    }
  }
}



function handleError(h, response, offline) {
  log('error', 'receive', response, response.desc);

  if (offline) {
    h.emit('offline', response);
  } else {
    h.emit('error', response);
  }
}

var appSendResp = (function (h, response) {
  var code = response.code;


  select(code, {
    '200': function _() {
      return handleData(h, response);
    },

    '1400018': function _() {
      return handleError(h, response, true);
    },
    '1400035': function _() {
      return handleError(h, response, true);
    },

    defaults: function defaults() {
      return handleError(h, response);
    }
  });
});

var devLogin = (function (h, response) {
  log('info', 'receive', response);

  h.emit('online', response);
});

var devLogout = (function (h, response) {
  log('error', 'receive', response);

  h.emit('offline', response);
});

var devSend = (function (h, response) {
  handleData(h, response);
});

var errorResp = (function (h, response) {
  handleError(h, response);
});



var actions = Object.freeze({
	appSendResp: appSendResp,
	devLogin: devLogin,
	devLogout: devLogout,
	devSend: devSend,
	errorResp: errorResp
});

var devEvent = (function (h) {
  return function (data) {
    var action = data.action;

    var actionFn = actions[action];

    if (actionFn) actionFn(h, data);
  };
});

var index$5 = function () {
  var h = this;

  h.receive = devEvent(h);

  if (h.options.matrix) {
    h.options.matrix.on('receive', h.receive);
  }

  return h;
};

var JCDataType;
(function (JCDataType) {
    JCDataType["INT"] = "INT";
    JCDataType["FLOAT"] = "FLOAT";
    JCDataType["STRING"] = "STRING";
})(JCDataType || (JCDataType = {}));
var JTDataType;
(function (JTDataType) {
    JTDataType["NUMBER"] = "NUMBER";
    JTDataType["STRING"] = "STRING";
})(JTDataType || (JTDataType = {}));
var T48DataType;
(function (T48DataType) {
    T48DataType["NUMBER"] = "NUMBER";
    T48DataType["STRING"] = "STRING";
})(T48DataType || (T48DataType = {}));
var T48V2DataType;
(function (T48V2DataType) {
    T48V2DataType["NUMBER"] = "NUMBER";
    T48V2DataType["STRING"] = "STRING";
})(T48V2DataType || (T48V2DataType = {}));

var WorkModeType;
(function (WorkModeType) {
    WorkModeType["JSON_CTRL"] = "JSON_CTRL";
    WorkModeType["JSON_TRANSPARENT"] = "JSON_TRANSPARENT";
    WorkModeType["JSON_TRANSPARENT_NOT_CHECK_RAW"] = "JSON_TRANSPARENT_NOT_CHECK_RAW";
    WorkModeType["TRANSPARENT48"] = "TRANSPARENT48";
    WorkModeType["TRANSPARENT48_V2"] = "TRANSPARENT48_V2";
})(WorkModeType || (WorkModeType = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var jsonCtrl = function (data, protocol) {
    var cmd = protocol[data.cmdId];
    if (!cmd) throw new ReferenceError("Command '" + data.cmdId + "' does not exist");
    return __assign({}, data, { cmdTag: cmd.cmdTag });
};

var utf8 = {
    /**
     * 把字符串转换为utf8编码字节数组
     * @param raw
     */
    toBytes: function (raw) {
        var bytes = [];
        var i = 0;
        while (i < raw.length) {
            var charCode = raw.charCodeAt(i);
            if (charCode < 0x80) {
                // ascii码直接转换
                bytes.push(charCode);
                i += 1;
            } else if (charCode < 0x800) {
                // 两个字节表示一个字符
                bytes.push(0xc0 | charCode >> 6, 0x80 | charCode & 0x3f);
                i += 1;
            } else if (charCode < 0xd800 || charCode >= 0xe000) {
                // 三个字节表示一个字符的情况
                bytes.push(0xe0 | charCode >> 12, 0x80 | charCode >> 6 & 0x3f, 0x80 | charCode & 0x3f);
                i += 1;
            } else {
                // 4个字节表示一个字符的情况
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charCode = 0x10000 + ((charCode & 0x3ff) << 10 | raw.charCodeAt(i) & 0x3ff);
                bytes.push(0xf0 | charCode >> 18, 0x80 | charCode >> 12 & 0x3f, 0x80 | charCode >> 6 & 0x3f, 0x80 | charCode & 0x3f);
                i += 2;
            }
        }
        return bytes;
    },
    /**
     * 把utf8字节数组还原为字符
     * @param bytes
     */
    toString: function (bytes) {
        var raw = '';
        var i = 0;
        while (i < bytes.length) {
            var charCode = bytes[i];
            if (charCode < 0x80) {
                raw += String.fromCharCode(charCode);
                i += 1;
            } else if (charCode > 0xbf && charCode < 0xe0) {
                charCode = (charCode & 0x1f) << 6;
                charCode |= bytes[i + 1] & 0x3f;
                raw += String.fromCharCode(charCode);
                i += 2;
            } else if (charCode > 0xdf && charCode < 0xf0) {
                charCode = (charCode & 0x0f) << 12;
                charCode |= (bytes[i + 1] & 0x3f) << 6;
                charCode |= bytes[i + 2] & 0x3f;
                raw += String.fromCharCode(charCode);
                i += 3;
            } else {
                // surrogate pair
                charCode = (charCode & 0x07) << 18;
                charCode |= (bytes[i + 1] & 0x3f) << 12;
                charCode |= (bytes[i + 2] & 0x3f) << 6;
                charCode |= bytes[i + 3] & 0x3f;
                charCode -= 0x010000;
                raw += String.fromCharCode(charCode >> 10 | 0xd800, charCode & 0x03ff | 0xdc00);
                i += 4;
            }
        }
        return raw;
    }
};

/**
 * 10进制转为16进制
 * @param dec
 * @param length
 */
var decToHex = function (dec, length) {
    if (length === void 0) {
        length = 1;
    }
    var hex = dec.toString(16);
    while (length * 2 > hex.length) hex = "0" + hex;
    return hex.slice(-length * 2);
};
/**
 * 16进制转10进制
 * @param hex
 */
var hexToDec = function (hex) {
    return parseInt(hex, 16);
};
/**
 * 根据条件查找命令
 * @param protocol
 * @param predicate
 */
var findCommand = function (protocol, predicate) {
    var key = Object.keys(protocol).find(function (key) {
        return predicate(protocol[key], key);
    });
    if (key) return protocol[key];
};
/**
 * 把数字转换为指定长度的byte数组
 * @param val
 * @param dataLength
 */
var numberToBytes = function (val, dataLength) {
    var i = 0;
    var raw = [];
    // 一个字节一个字节的推入数组
    while (i < dataLength) {
        /**
         * 取最后一个字节(8bit)的数据
         * 例如493的二进制数据为0b111101101
         * 与数据255(0b11111111)按照位进行与运算
         * 0b111101101
         *  0b11111111
         * 0b011101101
         * 得到结果为0b11101101
         */
        raw.unshift(val >>> 8 * i & 0xff);
        i++;
    }
    return raw;
};
/**
 * 把字符串转换为指定长度的byte数组
 * @param val
 * @param dataLength
 */
var stringToBytes = function (val, dataLength) {
    var bytes = utf8.toBytes(val);
    return bytes.concat(new Array(dataLength - bytes.length).fill(0)).slice(-dataLength);
};
/**
 * 把字符串按指定长度为一组分割为数组
 * @param raw
 * @param length
 */
var toChunkArray = function (raw, length) {
    if (length === void 0) {
        length = 2;
    }
    var i = 0;
    var data = [];
    while (i < raw.length / length) {
        data.push(raw.substr(i * length, length));
        i++;
    }
    return data;
};

var jsonTransparent = function (data, protocol) {
    var msgId = hexToDec(data.raw.slice(6, 8));
    var cmdId = hexToDec(data.raw.slice(8, 10));
    var cmd = protocol[cmdId];
    if (!cmd) throw new ReferenceError("Command '" + cmdId + "' does not exist");
    var raw = data.raw.slice(10, -2);
    return cmd.fields.reduce(function (val, field) {
        var name = field.name,
            dataLength = field.dataLength,
            dataType = field.dataType;
        if (dataType === JTDataType.NUMBER) {
            val[name] = hexToDec(raw.slice(0, dataLength * 2));
        } else if (dataType === JTDataType.STRING) {
            var codes = toChunkArray(raw.slice(0, dataLength * 2)).map(function (val) {
                return hexToDec(val);
            }).filter(function (val) {
                return val;
            });
            val[name] = utf8.toString(codes);
        }
        raw = raw.slice(dataLength * 2);
        return val;
    }, { msgId: msgId, cmdId: cmdId, cmdTag: cmd.cmdTag });
};

var jsonTransparentNotCheckRaw = function (data) {
    return data;
};

var transparent48 = function (data, protocol) {
    var frameType = hexToDec(data.raw.slice(4, 6));
    var msgId = hexToDec(data.raw.slice(8, 12));
    // 去掉appTid
    var index = frameType === 7 ? 140 : 12;
    var cmdId = hexToDec(data.raw.substr(index, 2));
    var cmd = protocol[cmdId];
    if (!cmd) throw new ReferenceError("Command '" + cmdId + "' does not exist");
    var raw = data.raw.slice(index + 2, -2);
    return cmd.fields.reduce(function (val, field) {
        var name = field.name,
            dataLength = field.dataLength,
            dataType = field.dataType;
        if (dataType === T48DataType.NUMBER) {
            val[name] = hexToDec(raw.slice(0, dataLength * 2));
        } else if (dataType === T48DataType.STRING) {
            var codes = toChunkArray(raw.slice(0, dataLength * 2)).map(function (val) {
                return hexToDec(val);
            }).filter(function (val) {
                return val;
            });
            val[name] = utf8.toString(codes);
        }
        raw = raw.slice(dataLength * 2);
        return val;
    }, { msgId: msgId, cmdId: cmdId, cmdTag: cmd.cmdTag });
};

var transparent48V2 = function (data, protocol) {
    var msgId = hexToDec(data.raw.slice(6, 8));
    var cmdId = hexToDec(data.raw.slice(8, 10));
    var cmd = protocol[cmdId];
    if (!cmd) throw new ReferenceError("Command '" + cmdId + "' does not exist");
    var raw = data.raw.slice(10, -2);
    return cmd.fields.reduce(function (val, field) {
        var name = field.name,
            _a = field.dataLength,
            dataLength = _a === void 0 ? 0 : _a,
            dataType = field.dataType;
        if (dataType === T48V2DataType.NUMBER) {
            val[name] = hexToDec(raw.slice(0, dataLength * 2));
        } else if (dataType === T48V2DataType.STRING) {
            var codes = toChunkArray(raw.slice(0, dataLength * 2)).map(function (val) {
                return hexToDec(val);
            }).filter(function (val) {
                return val;
            });
            val[name] = utf8.toString(codes);
        }
        raw = raw.slice(dataLength * 2);
        return val;
    }, { msgId: msgId, cmdId: cmdId, cmdTag: cmd.cmdTag });
};

var decode$1 = function (data, protocol, workModeType) {
    switch (workModeType) {
        case WorkModeType.JSON_CTRL:
            return jsonCtrl(data, protocol);
        case WorkModeType.JSON_TRANSPARENT_NOT_CHECK_RAW:
            return jsonTransparent(data, protocol);
        case WorkModeType.JSON_TRANSPARENT_NOT_CHECK_RAW:
            return jsonTransparentNotCheckRaw(data);
        case WorkModeType.TRANSPARENT48:
            return transparent48(data, protocol);
        case WorkModeType.TRANSPARENT48_V2:
            return transparent48V2(data, protocol);
        default:
            throw new RangeError("Protocol '" + workModeType + "' does not exist");
    }
};

/**
 * 参数值验证
 */
var verify = {
    /**
     * 数值类型参数验证，数值类型有INT、FLOAT、NUMBER
     * @param value 要验证的值
     * @param param1 字段属性
     * @param callback 回调函数
     */
    number: function (value, _a, callback) {
        var enumeration = _a.enumeration,
            minValue = _a.minValue,
            maxValue = _a.maxValue;
        if (typeof value !== 'number') throw new TypeError("Value " + value + " is not a number");
        if (enumeration && enumeration.length && !enumeration.find(function (item) {
            return item.value === value;
        })) throw new RangeError("Value " + value + " is not in the enumeration range");
        if (minValue != null && value < minValue || maxValue != null && value > maxValue) throw new RangeError("Value " + value + " is not in the correct range");
        callback(value);
    },
    /**
     * 字符串类型参数验证
     * @param value 要验证的值
     * @param param1 字段属性
     * @param callback 回调函数
     */
    string: function (value, _a, callback) {
        var dataLength = _a.dataLength;
        if (typeof value !== 'string') throw new TypeError("Value " + value + " is not a string");
        // JSON主控没有dataLength属性
        if (typeof dataLength === 'number' && dataLength < utf8.toBytes(value).length) throw new RangeError("String '" + value + "' longer than maximum length(" + dataLength + ")");
        callback(value);
    }
};

var jsonCtrl$1 = function (data, protocol) {
    var cmd = findCommand(protocol, function (_a) {
        var cmdId = _a.cmdId,
            cmdTag = _a.cmdTag;
        return cmdId === data.cmdId || cmdTag === data.cmdTag;
    });
    if (!cmd) throw new ReferenceError("Command '" + (data.cmdId || data.cmdTag) + "' does not exist");
    return cmd.fields.reduce(function (frame, field) {
        switch (field.dataType) {
            case JCDataType.INT:
            case JCDataType.FLOAT:
                verify.number(data[field.name], field, function (val) {
                    frame[field.name] = val;
                });
                break;
            case JCDataType.STRING:
                verify.string(data[field.name], field, function (val) {
                    frame[field.name] = val;
                });
                break;
            default:
                break;
        }
        return frame;
    }, { cmdId: cmd.cmdId, msgId: data.msgId || 0 });
};

var jsonTransparent$1 = function (data, protocol) {
    var cmd = findCommand(protocol, function (_a) {
        var cmdId = _a.cmdId,
            cmdTag = _a.cmdTag;
        return cmdId === data.cmdId || cmdTag === data.cmdTag;
    });
    if (!cmd) throw new ReferenceError("Command '" + (data.cmdId || data.cmdTag) + "' does not exist");
    var frame = cmd.fields.reduce(function (frame, field) {
        var name = field.name,
            dataLength = field.dataLength,
            dataType = field.dataType;
        frame[1] = frame[1] + dataLength;
        switch (dataType) {
            case JTDataType.NUMBER:
                verify.number(data[name], field, function (val) {
                    return frame.push.apply(frame, numberToBytes(val, dataLength));
                });
                break;
            case JTDataType.STRING:
                verify.string(data[name], field, function (val) {
                    return frame.push.apply(frame, stringToBytes(val, dataLength));
                });
                break;
            default:
                break;
        }
        return frame;
    }, [0x48, 6, cmd.frameType, (data.msgId || 0) % 0x100, cmd.cmdId]);
    var checkCode = frame.reduce(function (val, b) {
        return val + b;
    }, 0);
    frame.push(checkCode & 0xff);
    return {
        raw: frame.map(function (val) {
            return decToHex(val);
        }).join('')
    };
};

var jsonTransparentNotCheckRaw$1 = function (data) {
    return data;
};

var transparent48$1 = function (data, protocol) {
    var cmd = findCommand(protocol, function (_a) {
        var cmdId = _a.cmdId,
            cmdTag = _a.cmdTag;
        return cmdId === data.cmdId || cmdTag === data.cmdTag;
    });
    if (!cmd) throw new ReferenceError("Command '" + (data.cmdId || data.cmdTag) + "' does not exist");
    var appTid = cmd.frameType === 7 ? new Array(64).fill(0) : [];
    var length = cmd.frameType === 7 ? 72 : 8;
    var frame = cmd.fields.reduce(function (frame, field) {
        var name = field.name,
            dataLength = field.dataLength,
            dataType = field.dataType;
        frame[1] = frame[1] + dataLength;
        switch (dataType) {
            case T48DataType.NUMBER:
                verify.number(data[name], field, function (val) {
                    return frame.push.apply(frame, numberToBytes(val, dataLength));
                });
                break;
            case T48DataType.STRING:
                verify.string(data[name], field, function (val) {
                    return frame.push.apply(frame, stringToBytes(val, dataLength));
                });
                break;
            default:
                break;
        }
        return frame;
    }, [0x48, length, cmd.frameType, 0, (data.msgId || 0) >>> 8 & 0xff, (data.msgId || 0) & 0xff].concat(appTid, [cmd.cmdId]));
    var checkCode = frame.reduce(function (val, b) {
        return val + b;
    }, 0);
    frame.push(checkCode & 0xff);
    return {
        raw: frame.map(function (val) {
            return decToHex(val);
        }).join('')
    };
};

var transparent48V2$1 = function (data, protocol) {
    var cmd = findCommand(protocol, function (_a) {
        var cmdId = _a.cmdId,
            cmdTag = _a.cmdTag;
        return cmdId === data.cmdId || cmdTag === data.cmdTag;
    });
    if (!cmd) throw new ReferenceError("Command '" + (data.cmdId || data.cmdTag) + "' does not exist");
    var frame = cmd.fields.reduce(function (frame, field) {
        var name = field.name,
            dataLength = field.dataLength,
            dataType = field.dataType;
        frame[1] = frame[1] + dataLength;
        switch (dataType) {
            case T48V2DataType.NUMBER:
                verify.number(data[name], field, function (val) {
                    return frame.push.apply(frame, numberToBytes(val, dataLength));
                });
                break;
            case T48V2DataType.STRING:
                verify.string(data[name], field, function (val) {
                    return frame.push.apply(frame, stringToBytes(val, dataLength));
                });
                break;
            default:
                break;
        }
        return frame;
    }, [0x48, 6, cmd.frameType, (data.msgId || 0) % 0x100, cmd.cmdId]);
    var checkCode = frame.reduce(function (val, b) {
        return val + b;
    }, 0);
    frame.push(checkCode & 0xff);
    return {
        raw: frame.map(function (val) {
            return decToHex(val);
        }).join('')
    };
};

var encode$1 = function (data, protocol, workModeType) {
    switch (workModeType) {
        case WorkModeType.JSON_CTRL:
            return jsonCtrl$1(data, protocol);
        case WorkModeType.JSON_TRANSPARENT_NOT_CHECK_RAW:
            return jsonTransparent$1(data, protocol);
        case WorkModeType.JSON_TRANSPARENT_NOT_CHECK_RAW:
            return jsonTransparentNotCheckRaw$1(data);
        case WorkModeType.TRANSPARENT48:
            return transparent48$1(data, protocol);
        case WorkModeType.TRANSPARENT48_V2:
            return transparent48V2$1(data, protocol);
        default:
            throw new RangeError("Protocol '" + workModeType + "' does not exist");
    }
};

function encode(data) {
  var _template = this.template,
      protocol = _template.protocol,
      workModeType = _template.workModeType;

  return encode$1(data, protocol, workModeType);
}

function decode(data) {
  var _template2 = this.template,
      protocol = _template2.protocol,
      workModeType = _template2.workModeType;

  return decode$1(data, protocol, workModeType);
}

var appSend = (function (h, msgId, encoded, data) {
  var frame = {
    action: 'appSend',
    msgId: msgId,
    params: {
      appTid: 'web',
      devTid: h.device.devTid,
      subDevTid: h.device.subDevTid,
      ctrlKey: h.device.ctrlKey,
      data: encoded
    }
  };

  var command = '';

  if (data.cmdTag != null) {
    command = String(data.cmdTag);
  } else if (data.cmdId != null) {
    command = String(data.cmdId);
  }

  log('info', 'send   ', frame, command, data);

  return frame;
});



var actions$1 = Object.freeze({
	appSend: appSend
});

var frame = function (action, msgId) {
  var h = this;

  var actionFn = actions$1[action];

  if (actionFn) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var frame = actionFn.apply(undefined, [h, msgId].concat(toConsumableArray(args)));

    if (h.options.matrix) {
      h.options.matrix.send(frame);
    }
    show(h);
  }

  return h;
};

var send = function (data) {
  var h = this;

  var msgId = data.msgId = h.msgId;

  var encoded = h.encode(data);

  if (encoded) {
    h.sendFrame('appSend', msgId, encoded, data);
  }

  return h;
};

var ready = function (callback) {
  var h = this;
  if (typeof callback === 'function') {
    h['[[READY]]'].then(function () {
      return callback();
    });
  }
  return h['[[READY]]'];
};

var destroy = function () {
  var h = this;

  if (h.options.matrix) {
    h.options.matrix.off('receive', h.receive);
  }
  h.off();
  h['[[TIMER]]'].forEach(function (timer) {
    return clearTimeout(timer);
  });
  h['[[TIMER]]'] = [];
};

var index$8 = function () {
  var h = this;

  var _h$options$query = h.options.query,
      frame = _h$options$query.frame,
      duration = _h$options$query.duration,
      auto = _h$options$query.auto,
      timeService = _h$options$query.timeService,
      fn = _h$options$query.fn;


  h['[[TIMER]]'] = [];

  var cycle = function cycle(fn, delay, immediate) {
    if (immediate) fn();

    var timer = setTimeout(function () {
      fn();
      var index = h['[[TIMER]]'].indexOf(timer);
      if (index !== -1) h['[[TIMER]]'].splice(index, 1);
      cycle(fn, delay, false);
    }, delay * 1000);

    h['[[TIMER]]'].push(timer);
  };

  if (auto) {
    cycle(function () {
      var now = new Date();

      var timeServiceFrame = timeService.reduce(function (querying, time) {
        querying[time] = select(time, {
          year: function year() {
            return now.getFullYear();
          },
          month: function month() {
            return now.getMonth() + 1;
          },
          week: function week() {
            return now.getDay();
          },
          day: function day() {
            return now.getDate();
          },
          hour: function hour() {
            return now.getHours();
          },
          minute: function minute() {
            return now.getMinutes();
          }
        });

        return querying;
      }, _extends({}, frame));

      setIsQuery();
      h.send(fn(timeServiceFrame));
    }, duration, true);
  }

  return h;
};

var msgId = function () {
  var h = this;
  var msgId = 0;

  Object.defineProperty(h, 'msgId', {
    get: function get() {
      return h.options.matrix ? h.options.matrix.getMsgId() : msgId++;
    }
  });

  return h;
};

var run = function (options) {
  var _this = this;

  var h = this;
  h.URL = null;
  h.device = null;
  h.fetch = null;
  h.template = null;
  h.options = h.getOptions(options);

  h.counter();
  h['[[READY]]'] = new Promise(function (resolve, reject) {
    h['[[REJECT]]'] = reject;
    h['[[RESOLVE]]'] = resolve;
  });

  var execute = function execute() {
    return asyncToGenerator(regenerator.mark(function _callee() {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              h.URL = h.getURL();
              h.fetcher();

              _context.next = 4;
              return h.getDevice();

            case 4:
              h.device = _context.sent;
              _context.next = 7;
              return h.getProtocol();

            case 7:
              h.template = _context.sent;


              h.observer();

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))().then(function () {
      h['[[RESOLVE]]']();
      h.ready(function () {
        return h.timer();
      });
    }).catch(function (err) {
      return h['[[REJECT]]'](err);
    });
  };

  if (h.options.matrix) {
    h.options.matrix.ready(function () {
      return execute();
    });
  }
  return h;
};



var inject$1 = Object.freeze({
	fetcher: index$1,
	observer: index$5,
	timer: index$8,
	counter: msgId,
	run: run,
	getURL: getURL,
	getDevice: getDevice,
	getOptions: getOptions,
	getProtocol: getProtocol,
	on: on,
	once: once,
	off: off,
	emit: emit,
	encode: encode,
	decode: decode,
	sendFrame: frame,
	send: send,
	ready: ready,
	destroy: destroy
});

var inject = (function (Hekr) {
  _extends(Hekr.prototype, inject$1);
});

var _class;

var Hekr = inject(_class = function Hekr(options) {
  classCallCheck(this, Hekr);
  this.version = '0.1.3-alpha.5';

  this.run(options);
}) || _class;

Hekr.version = '0.1.3-alpha.5';

var msgId$1 = 0;

var msgId$2 = (function () {
  return msgId$1++;
});

var ready$1 = function (callback) {
  var m = this;
  if (typeof callback === 'function') {
    m['[[READY]]'].then(function () {
      return callback();
    });
  }
  return m['[[READY]]'];
};

var send$1 = function (data) {
  var m = this;
  if (m.ws && m.ws.readyState === 1) {
    m.ws.send(JSON.stringify(data));
  }

  return m;
};

var setToken = function (token) {
  var m = this;
  m.ws.close();
  m.token = token;
  return m;
};

var destroy$1 = function () {
  var m = this;

  m['[[destroyed]]'] = true;
  m.ws.close();
  m.off();
  m['[[TIMER]]'].forEach(function (timer) {
    return clearTimeout(timer);
  });
  m['[[TIMER]]'] = [];
};

var open = (function (m) {
  return function () {
    m['[[TIMER]]'] = [];

    var cycle = function cycle(fn, delay, immediate) {
      if (immediate) fn();

      var timer = setTimeout(function () {
        fn();
        var index = m['[[TIMER]]'].indexOf(timer);
        if (index !== -1) m['[[TIMER]]'].splice(index, 1);
        cycle(fn, delay, false);
      }, delay * 1000);

      m['[[TIMER]]'].push(timer);
    };

    m.send({
      action: 'appLogin',
      msgId: m.getMsgId(),
      params: {
        appTid: 'web',
        token: m.token
      }
    });

    cycle(function () {
      m.send({
        action: 'heartbeat',
        msgId: m.getMsgId()
      });
    }, 20);
  };
});

var message = (function (m) {
  return function (event) {
    if (typeof event.data === 'string') {
      var response = JSON.parse(event.data);

      if (response.action === 'appLoginResp' && response.code === 200) {
        m['[[RESOLVE]]']();
      }

      m.emit('receive', response);
    }
  };
});

var index$9 = function () {
  var m = this;

  if (m['[[destroyed]]']) return m;
  var ws = new WebSocket(m.URL.ws);

  ws.addEventListener('open', open(m));
  ws.addEventListener('message', message(m));
  ws.addEventListener('close', function () {
    if (m.reconnect && !m['[[destroyed]]']) {
      m.provider();
    }
  });

  m.ws = ws;

  return m;
};

var run$1 = asyncToGenerator(regenerator.mark(function _callee() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var m;
  return regenerator.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          m = this;


          m['[[READY]]'] = new Promise(function (resolve, reject) {
            m['[[REJECT]]'] = reject;
            m['[[RESOLVE]]'] = resolve;
          });

          m.URL = _extends({}, URL, options.URL);
          m.reconnect = options.reconnect || false;
          m.token = options.token;
          m.provider();

          return _context.abrupt('return', m);

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));



var inject$4 = Object.freeze({
	provider: index$9,
	run: run$1,
	on: on,
	once: once,
	off: off,
	emit: emit,
	getMsgId: msgId$2,
	ready: ready$1,
	send: send$1,
	setToken: setToken,
	destroy: destroy$1
});

var inject$3 = (function (Matrix) {
  _extends(Matrix.prototype, inject$4);
});

var _class$1;

var Matrix = inject$3(_class$1 = function Matrix(options) {
  classCallCheck(this, Matrix);
  this.version = '0.1.3-alpha.5';

  this.run(options);
}) || _class$1;

Matrix.version = '0.1.3-alpha.5';

var index = {
  Hekr: Hekr,
  Matrix: Matrix
};

export { Hekr, Matrix };export default index;
//# sourceMappingURL=sdk-web.es.js.map
