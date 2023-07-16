"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateKeystores = void 0;
var bls_keystore_1 = require("@chainsafe/bls-keystore");
var DeriveValidator_1 = require("./DeriveValidator");
/**
 * Generates keystores for a range of validator indexes, given a master secret key and a password.
 * @param {Uint8Array} masterSecretKey The master secret key to derive the validator secret keys from.
 * @param {number} startIndex The index of the first validator to generate a keystore for.
 * @param {number} numberOfValidators The number of validators to generate keystores for. (starting from startIndex)
 * @param {string} password The password to encrypt the keystores with.
 * @returns {IKeystoreObject[]} An array of keystores for the given validator indexes.
 */
function GenerateKeystores(masterSecretKey, startIndex, numberOfValidators, password) {
    return __awaiter(this, void 0, void 0, function () {
        var validatorIndexes, keystorePromises;
        var _this = this;
        return __generator(this, function (_a) {
            validatorIndexes = Array.from({ length: numberOfValidators }, function (_, index) { return startIndex + index; });
            keystorePromises = validatorIndexes.map(function (validatorIndex) { return __awaiter(_this, void 0, void 0, function () {
                var _a, secretKey, pubkey;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = (0, DeriveValidator_1.DeriveValidator)(masterSecretKey, validatorIndex), secretKey = _a.secretKey, pubkey = _a.pubkey;
                            return [4 /*yield*/, bls_keystore_1.Keystore.create(password, secretKey.toBytes(), pubkey, "m/12381/3600/".concat(validatorIndex, "/0/0"))];
                        case 1: return [2 /*return*/, (_b.sent())];
                    }
                });
            }); });
            return [2 /*return*/, Promise.all(keystorePromises)];
        });
    });
}
exports.GenerateKeystores = GenerateKeystores;
