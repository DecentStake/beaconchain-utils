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
exports.generateDepositData = exports.generatePackedDepositData = void 0;
var bls_keygen_1 = require("@chainsafe/bls-keygen");
var ssz_1 = require("@chainsafe/ssz");
var utils_1 = require("../utils");
var DeriveValidator_1 = require("./DeriveValidator");
var SignDepositData_1 = require("./SignDepositData");
/**
 * Generates a packed deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @returns {PackedDepositData} An object containing the deposit data for the given validator indexes, ready for use in the BatchDeposit contract.
 * @notice We return DepositData as an object with string properties, rather than a Uint8Array, for ease of use in back-front communication.
 */
function generatePackedDepositData(validatorMnemonic, depositor, validatorIndexes) {
    return __awaiter(this, void 0, void 0, function () {
        var withdrawalCredential, masterSecretKey, packedPubkeys, packedSignatures, depositDataRoots, _i, validatorIndexes_1, validatorIndex, _a, pubkey, secretKey, _b, signature, depositDataRoot;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    withdrawalCredential = (0, utils_1.parseAddressToBLS)(depositor);
                    masterSecretKey = (0, bls_keygen_1.deriveKeyFromMnemonic)(validatorMnemonic);
                    packedPubkeys = new Uint8Array();
                    packedSignatures = new Uint8Array();
                    depositDataRoots = [];
                    _i = 0, validatorIndexes_1 = validatorIndexes;
                    _c.label = 1;
                case 1:
                    if (!(_i < validatorIndexes_1.length)) return [3 /*break*/, 4];
                    validatorIndex = validatorIndexes_1[_i];
                    _a = (0, DeriveValidator_1.DeriveValidator)(masterSecretKey, validatorIndex), pubkey = _a.pubkey, secretKey = _a.secretKey;
                    return [4 /*yield*/, (0, SignDepositData_1.SignDepositData)(pubkey, withdrawalCredential, secretKey)];
                case 2:
                    _b = _c.sent(), signature = _b.signature, depositDataRoot = _b.deposit_data_root;
                    packedPubkeys = (0, utils_1.appendUint8Arrays)(packedPubkeys, pubkey);
                    packedSignatures = (0, utils_1.appendUint8Arrays)(packedSignatures, signature);
                    depositDataRoots.push((0, ssz_1.toHexString)(depositDataRoot));
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, {
                        pubkeys: (0, ssz_1.toHexString)(packedPubkeys),
                        withdrawal_credential: (0, ssz_1.toHexString)(withdrawalCredential),
                        signatures: (0, ssz_1.toHexString)(packedSignatures),
                        deposit_data_roots: depositDataRoots,
                    }];
            }
        });
    });
}
exports.generatePackedDepositData = generatePackedDepositData;
/**
 * Generates deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @param {NetworkNames} network Name of the network to generate deposit data for.
 * @returns {DepositData[]} An array of depositData objects, similar to what deposit_cli outputs.
 */
function generateDepositData(validatorMnemonic, depositor, validatorIndexes, network) {
    if (network === void 0) { network = 'mainnet'; }
    return __awaiter(this, void 0, void 0, function () {
        var withdrawalCredential, masterSecretKey, depositDataPromises;
        var _this = this;
        return __generator(this, function (_a) {
            withdrawalCredential = (0, utils_1.parseAddressToBLS)(depositor);
            masterSecretKey = (0, bls_keygen_1.deriveKeyFromMnemonic)(validatorMnemonic);
            depositDataPromises = validatorIndexes.map(function (validatorIndex) { return __awaiter(_this, void 0, void 0, function () {
                var _a, pubkey, secretKey, _b, signature, depositDataRoot, depositMessageRoot, forkVersion;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = (0, DeriveValidator_1.DeriveValidator)(masterSecretKey, validatorIndex), pubkey = _a.pubkey, secretKey = _a.secretKey;
                            return [4 /*yield*/, (0, SignDepositData_1.SignDepositData)(pubkey, withdrawalCredential, secretKey)];
                        case 1:
                            _b = _c.sent(), signature = _b.signature, depositDataRoot = _b.deposit_data_root, depositMessageRoot = _b.deposit_message_root, forkVersion = _b.fork_version;
                            return [2 /*return*/, {
                                    pubkey: (0, ssz_1.toHexString)(pubkey).slice(2),
                                    withdrawal_credentials: (0, ssz_1.toHexString)(withdrawalCredential).slice(2),
                                    amount: 32e9,
                                    signature: (0, ssz_1.toHexString)(signature).slice(2),
                                    deposit_message_root: (0, ssz_1.toHexString)(depositMessageRoot).slice(2),
                                    deposit_data_root: (0, ssz_1.toHexString)(depositDataRoot).slice(2),
                                    fork_version: (0, ssz_1.toHexString)(forkVersion).slice(2),
                                    network_name: network,
                                }];
                    }
                });
            }); });
            return [2 /*return*/, Promise.all(depositDataPromises)];
        });
    });
}
exports.generateDepositData = generateDepositData;
