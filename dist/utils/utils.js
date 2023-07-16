"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importDynamic = exports.parseAddressToBLS = exports.appendUint8Arrays = void 0;
var ssz_1 = require("@chainsafe/ssz");
/**
 * Utility function to append two Uint8Arrays.
 * @param array1 The first Uint8Array.
 * @param array2 The second Uint8Array.
 * @returns The concatenated Uint8Array.
 */
var appendUint8Arrays = function (array1, array2) {
    var tmp = new Uint8Array(array1.length + array2.length);
    tmp.set(array1, 0);
    tmp.set(array2, array1.length);
    return tmp;
};
exports.appendUint8Arrays = appendUint8Arrays;
/**
 * Parse an Ethereum address to a BLS execution layer withdrawal credential.
 * @param {string} address The Ethereum address to parse.
 * @returns {Uint8Array} The BLS execution layer withdrawal credential as a Uint8Array.
 */
var parseAddressToBLS = function (address) {
    return (0, ssz_1.fromHexString)("0x010000000000000000000000".concat(address.replace('0x', '')));
};
exports.parseAddressToBLS = parseAddressToBLS;
// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
exports.importDynamic = new Function('modulePath', 'return import(modulePath)');
