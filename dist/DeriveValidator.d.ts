import type { IValidator } from './interfaces';
/**
 * Derive a validator's secret key and public key from a master secret key and validator index.
 * @param {Uint8Array} masterSecretKey The master secret key.
 * @param {number} validatorIndex The validator index.
 * @returns {Validator} The validator's secret key and public key as an object.
 */
export declare function DeriveValidator(masterSecretKey: Uint8Array, validatorIndex: number): IValidator;
