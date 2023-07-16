"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeriveValidator = void 0;
var bls_keygen_1 = require("@chainsafe/bls-keygen");
var blst_1 = require("@chainsafe/blst");
/**
 * Derive a validator's secret key and public key from a master secret key and validator index.
 * @param {Uint8Array} masterSecretKey The master secret key.
 * @param {number} validatorIndex The validator index.
 * @returns {Validator} The validator's secret key and public key as an object.
 */
function DeriveValidator(masterSecretKey, validatorIndex) {
    var secretKey = blst_1.SecretKey.fromBytes((0, bls_keygen_1.deriveEth2ValidatorKeys)(masterSecretKey, validatorIndex).signing);
    var pubkey = secretKey.toPublicKey().toBytes();
    return { pubkey: pubkey, secretKey: secretKey };
}
exports.DeriveValidator = DeriveValidator;
