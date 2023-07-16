'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var blsKeygen = require('@chainsafe/bls-keygen');
var blst = require('@chainsafe/blst');
var ssz = require('@chainsafe/ssz');
var blsKeystore = require('@chainsafe/bls-keystore');

var DepositData = function DepositData(data) {
  this.pubkey = data.pubkey;
  this.withdrawal_credentials = data.withdrawal_credentials;
  this.amount = data.amount;
  this.signature = data.signature;
  this.deposit_message_root = data.deposit_message_root;
  this.deposit_data_root = data.deposit_data_root;
  this.fork_version = data.fork_version;
  this.network_name = data.network_name;
};
var PackedDepositData = function PackedDepositData(data) {
  this.pubkeys = data.pubkeys;
  this.withdrawal_credential = data.withdrawal_credential;
  this.signatures = data.signatures;
  this.deposit_data_roots = data.deposit_data_roots;
};

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends.apply(this, arguments);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * Derive a validator's secret key and public key from a master secret key and validator index.
 * @param {Uint8Array} masterSecretKey The master secret key.
 * @param {number} validatorIndex The validator index.
 * @returns {Validator} The validator's secret key and public key as an object.
 */
function DeriveValidator(masterSecretKey, validatorIndex) {
  var secretKey = blst.SecretKey.fromBytes(blsKeygen.deriveEth2ValidatorKeys(masterSecretKey, validatorIndex).signing);
  var pubkey = secretKey.toPublicKey().toBytes();
  return {
    pubkey: pubkey,
    secretKey: secretKey
  };
}

var CHAIN_CONFIGS = {
  mainnet: {
    GENESIS_FORK_VERSION: /*#__PURE__*/ssz.fromHexString('00000000'),
    GENESIS_VALIDATORS_ROOT: /*#__PURE__*/ssz.fromHexString('4b363db94e286120d76eb905340fdd4e54bfe9f06bf33ff6cf5ad27f511bfe95')
  },
  goerli: {
    GENESIS_FORK_VERSION: /*#__PURE__*/ssz.fromHexString('00001020'),
    GENESIS_VALIDATORS_ROOT: /*#__PURE__*/ssz.fromHexString('043db0d9a83813551ee2f33450d23797757d430911a9320530ad8a0eabc43efb')
  }
};



var index = {
	__proto__: null,
	CHAIN_CONFIGS: CHAIN_CONFIGS
};

var getDepositMessage = function getDepositMessage(pubkey, withdrawal_credential) {
  return {
    pubkey: pubkey,
    withdrawalCredentials: withdrawal_credential,
    amount: 32e9
  };
};

var signing = {
	__proto__: null,
	getDepositMessage: getDepositMessage
};

/**
 * Utility function to append two Uint8Arrays.
 * @param array1 The first Uint8Array.
 * @param array2 The second Uint8Array.
 * @returns The concatenated Uint8Array.
 */
var appendUint8Arrays = function appendUint8Arrays(array1, array2) {
  var tmp = new Uint8Array(array1.length + array2.length);
  tmp.set(array1, 0);
  tmp.set(array2, array1.length);
  return tmp;
};
/**
 * Parse an Ethereum address to a BLS execution layer withdrawal credential.
 * @param {string} address The Ethereum address to parse.
 * @returns {Uint8Array} The BLS execution layer withdrawal credential as a Uint8Array.
 */
var parseAddressToBLS = function parseAddressToBLS(address) {
  return ssz.fromHexString("0x010000000000000000000000" + address.replace('0x', ''));
};
// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
var importDynamic = /*#__PURE__*/new Function('modulePath', 'return import(modulePath)');



var index$1 = {
	__proto__: null,
	signing: signing,
	appendUint8Arrays: appendUint8Arrays,
	parseAddressToBLS: parseAddressToBLS,
	importDynamic: importDynamic
};

/**
 * Signs a deposit data object.
 * @param {Uint8Array} pubkey The validator's public key.
 * @param {Uint8Array} withdrawal_credential The validator's withdrawal credential.
 * @param {SecretKey} secretKey The validator's secret key.
 * @returns {DepositDataSignature} The signature and deposit data root as an object.
 */
function SignDepositData(_x, _x2, _x3, _x4) {
  return _SignDepositData.apply(this, arguments);
}
function _SignDepositData() {
  _SignDepositData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(pubkey, withdrawal_credential, secretKey, network) {
    var _yield$importDynamic, config, _yield$importDynamic2, DOMAIN_DEPOSIT, _yield$importDynamic3, ZERO_HASH, computeDomain, computeSigningRoot, _yield$importDynamic4, ssz, depositMessage, depositMessageRoot, domain, signingRoot, depositData, depositDataRoot;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (network === void 0) {
            network = 'mainnet';
          }
          _context.next = 3;
          return importDynamic('@lodestar/config/default');
        case 3:
          _yield$importDynamic = _context.sent;
          config = _yield$importDynamic.config;
          _context.next = 7;
          return importDynamic('@lodestar/params');
        case 7:
          _yield$importDynamic2 = _context.sent;
          DOMAIN_DEPOSIT = _yield$importDynamic2.DOMAIN_DEPOSIT;
          _context.next = 11;
          return importDynamic('@lodestar/state-transition');
        case 11:
          _yield$importDynamic3 = _context.sent;
          ZERO_HASH = _yield$importDynamic3.ZERO_HASH;
          computeDomain = _yield$importDynamic3.computeDomain;
          computeSigningRoot = _yield$importDynamic3.computeSigningRoot;
          _context.next = 17;
          return importDynamic('@lodestar/types');
        case 17:
          _yield$importDynamic4 = _context.sent;
          ssz = _yield$importDynamic4.ssz;
          depositMessage = getDepositMessage(pubkey, withdrawal_credential);
          depositMessageRoot = ssz.phase0.DepositMessage.hashTreeRoot(depositMessage);
          domain = computeDomain(DOMAIN_DEPOSIT, CHAIN_CONFIGS[network].GENESIS_FORK_VERSION, ZERO_HASH);
          signingRoot = computeSigningRoot(ssz.phase0.DepositMessage, depositMessage, domain);
          depositData = _extends({}, depositMessage, {
            signature: secretKey.sign(signingRoot).toBytes()
          });
          depositDataRoot = ssz.phase0.DepositData.hashTreeRoot(depositData);
          return _context.abrupt("return", {
            signature: depositData.signature,
            deposit_data_root: depositDataRoot,
            deposit_message_root: depositMessageRoot,
            fork_version: config.GENESIS_FORK_VERSION
          });
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _SignDepositData.apply(this, arguments);
}

var ValidatorSigner = /*#__PURE__*/function () {
  function ValidatorSigner(masterSecretKey, validatorIndex, network) {
    if (network === void 0) {
      network = 'mainnet';
    }
    var _DeriveValidator = DeriveValidator(masterSecretKey, validatorIndex),
      secretKey = _DeriveValidator.secretKey,
      pubkey = _DeriveValidator.pubkey;
    this.pubkey = pubkey;
    this.secretKey = secretKey;
    this.validatorIndex = validatorIndex;
    this.network = network;
  }
  var _proto = ValidatorSigner.prototype;
  _proto.SignDepositData = /*#__PURE__*/function () {
    var _SignDepositData2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(withdrawal_credential) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", SignDepositData(this.pubkey, withdrawal_credential, this.secretKey, this.network));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function SignDepositData$1(_x) {
      return _SignDepositData2.apply(this, arguments);
    }
    return SignDepositData$1;
  }();
  _createClass(ValidatorSigner, [{
    key: "ValidatorIndex",
    get: function get() {
      return this.validatorIndex;
    }
  }]);
  return ValidatorSigner;
}();



var index$2 = {
	__proto__: null,
	DepositData: DepositData,
	PackedDepositData: PackedDepositData,
	ValidatorSigner: ValidatorSigner
};

/**
 * Generates a packed deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @returns {PackedDepositData} An object containing the deposit data for the given validator indexes, ready for use in the BatchDeposit contract.
 * @notice We return DepositData as an object with string properties, rather than a Uint8Array, for ease of use in back-front communication.
 */
function generatePackedDepositData(_x, _x2, _x3) {
  return _generatePackedDepositData.apply(this, arguments);
}
/**
 * Generates deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @param {NetworkNames} network Name of the network to generate deposit data for.
 * @returns {DepositData[]} An array of depositData objects, similar to what deposit_cli outputs.
 */
function _generatePackedDepositData() {
  _generatePackedDepositData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(validatorMnemonic, depositor, validatorIndexes) {
    var withdrawalCredential, masterSecretKey, packedPubkeys, packedSignatures, depositDataRoots, _iterator, _step, validatorIndex, _DeriveValidator, pubkey, secretKey, _yield$SignDepositDat, signature, depositDataRoot;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          withdrawalCredential = parseAddressToBLS(depositor);
          masterSecretKey = blsKeygen.deriveKeyFromMnemonic(validatorMnemonic);
          packedPubkeys = new Uint8Array();
          packedSignatures = new Uint8Array();
          depositDataRoots = [];
          _iterator = _createForOfIteratorHelperLoose(validatorIndexes);
        case 6:
          if ((_step = _iterator()).done) {
            _context.next = 19;
            break;
          }
          validatorIndex = _step.value;
          _DeriveValidator = DeriveValidator(masterSecretKey, validatorIndex), pubkey = _DeriveValidator.pubkey, secretKey = _DeriveValidator.secretKey;
          /* eslint-disable no-await-in-loop */
          _context.next = 11;
          return SignDepositData(pubkey, withdrawalCredential, secretKey);
        case 11:
          _yield$SignDepositDat = _context.sent;
          signature = _yield$SignDepositDat.signature;
          depositDataRoot = _yield$SignDepositDat.deposit_data_root;
          packedPubkeys = appendUint8Arrays(packedPubkeys, pubkey);
          packedSignatures = appendUint8Arrays(packedSignatures, signature);
          depositDataRoots.push(ssz.toHexString(depositDataRoot));
        case 17:
          _context.next = 6;
          break;
        case 19:
          return _context.abrupt("return", {
            pubkeys: ssz.toHexString(packedPubkeys),
            withdrawal_credential: ssz.toHexString(withdrawalCredential),
            signatures: ssz.toHexString(packedSignatures),
            deposit_data_roots: depositDataRoots
          });
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _generatePackedDepositData.apply(this, arguments);
}
function generateDepositData(_x4, _x5, _x6, _x7) {
  return _generateDepositData.apply(this, arguments);
}
function _generateDepositData() {
  _generateDepositData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(validatorMnemonic, depositor, validatorIndexes, network) {
    var withdrawalCredential, masterSecretKey, depositDataPromises;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (network === void 0) {
            network = 'mainnet';
          }
          withdrawalCredential = parseAddressToBLS(depositor);
          masterSecretKey = blsKeygen.deriveKeyFromMnemonic(validatorMnemonic);
          depositDataPromises = validatorIndexes.map( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(validatorIndex) {
              var _DeriveValidator2, pubkey, secretKey, _yield$SignDepositDat2, signature, depositDataRoot, depositMessageRoot, forkVersion;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _DeriveValidator2 = DeriveValidator(masterSecretKey, validatorIndex), pubkey = _DeriveValidator2.pubkey, secretKey = _DeriveValidator2.secretKey;
                    _context2.next = 3;
                    return SignDepositData(pubkey, withdrawalCredential, secretKey);
                  case 3:
                    _yield$SignDepositDat2 = _context2.sent;
                    signature = _yield$SignDepositDat2.signature;
                    depositDataRoot = _yield$SignDepositDat2.deposit_data_root;
                    depositMessageRoot = _yield$SignDepositDat2.deposit_message_root;
                    forkVersion = _yield$SignDepositDat2.fork_version;
                    return _context2.abrupt("return", {
                      pubkey: ssz.toHexString(pubkey).slice(2),
                      withdrawal_credentials: ssz.toHexString(withdrawalCredential).slice(2),
                      amount: 32e9,
                      signature: ssz.toHexString(signature).slice(2),
                      deposit_message_root: ssz.toHexString(depositMessageRoot).slice(2),
                      deposit_data_root: ssz.toHexString(depositDataRoot).slice(2),
                      fork_version: ssz.toHexString(forkVersion).slice(2),
                      network_name: network
                    });
                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x8) {
              return _ref.apply(this, arguments);
            };
          }());
          return _context3.abrupt("return", Promise.all(depositDataPromises));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _generateDepositData.apply(this, arguments);
}

/**
 * Generates keystores for a range of validator indexes, given a master secret key and a password.
 * @param {Uint8Array} masterSecretKey The master secret key to derive the validator secret keys from.
 * @param {number} startIndex The index of the first validator to generate a keystore for.
 * @param {number} numberOfValidators The number of validators to generate keystores for. (starting from startIndex)
 * @param {string} password The password to encrypt the keystores with.
 * @returns {IKeystoreObject[]} An array of keystores for the given validator indexes.
 */
function GenerateKeystores(_x, _x2, _x3, _x4) {
  return _GenerateKeystores.apply(this, arguments);
}
function _GenerateKeystores() {
  _GenerateKeystores = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(masterSecretKey, startIndex, numberOfValidators, password) {
    var validatorIndexes, keystorePromises;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          validatorIndexes = Array.from({
            length: numberOfValidators
          }, function (_, index) {
            return startIndex + index;
          });
          keystorePromises = validatorIndexes.map( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(validatorIndex) {
              var _DeriveValidator, secretKey, pubkey;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _DeriveValidator = DeriveValidator(masterSecretKey, validatorIndex), secretKey = _DeriveValidator.secretKey, pubkey = _DeriveValidator.pubkey;
                    _context.next = 3;
                    return blsKeystore.Keystore.create(password, secretKey.toBytes(), pubkey, "m/12381/3600/" + validatorIndex + "/0/0");
                  case 3:
                    return _context.abrupt("return", _context.sent);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x5) {
              return _ref.apply(this, arguments);
            };
          }());
          return _context2.abrupt("return", Promise.all(keystorePromises));
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _GenerateKeystores.apply(this, arguments);
}



var index$3 = {
	__proto__: null
};

exports.DeriveValidator = DeriveValidator;
exports.GenerateKeystores = GenerateKeystores;
exports.SignDepositData = SignDepositData;
exports.classes = index$2;
exports.constants = index;
exports.generateDepositData = generateDepositData;
exports.generatePackedDepositData = generatePackedDepositData;
exports.interfaces = index$3;
exports.utils = index$1;
//# sourceMappingURL=eth2-beaconchain-utils.cjs.development.js.map
