/**
 * Utility function to append two Uint8Arrays.
 * @param array1 The first Uint8Array.
 * @param array2 The second Uint8Array.
 * @returns The concatenated Uint8Array.
 */
export declare const appendUint8Arrays: (array1: Uint8Array, array2: Uint8Array) => Uint8Array;
/**
 * Parse an Ethereum address to a BLS execution layer withdrawal credential.
 * @param {string} address The Ethereum address to parse.
 * @returns {Uint8Array} The BLS execution layer withdrawal credential as a Uint8Array.
 */
export declare const parseAddressToBLS: (address: string) => Uint8Array;
export declare const importDynamic: Function;
