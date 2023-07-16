import type { IKeystoreObject } from './interfaces';
/**
 * Generates keystores for a range of validator indexes, given a master secret key and a password.
 * @param {Uint8Array} masterSecretKey The master secret key to derive the validator secret keys from.
 * @param {number} startIndex The index of the first validator to generate a keystore for.
 * @param {number} numberOfValidators The number of validators to generate keystores for. (starting from startIndex)
 * @param {string} password The password to encrypt the keystores with.
 * @returns {IKeystoreObject[]} An array of keystores for the given validator indexes.
 */
export declare function GenerateKeystores(masterSecretKey: Uint8Array, startIndex: number, numberOfValidators: number, password: string): Promise<IKeystoreObject[]>;
