import { deriveEth2ValidatorKeys } from '@chainsafe/bls-keygen';
import { SecretKey } from '@chainsafe/blst';

import type { IValidator } from '../interfaces';

/**
 * Derive a validator's secret key and public key from a master secret key and validator index.
 * @param {Uint8Array} masterSecretKey The master secret key.
 * @param {number} validatorIndex The validator index.
 * @returns {Validator} The validator's secret key and public key as an object.
 */
export function DeriveValidator(masterSecretKey: Uint8Array, validatorIndex: number): IValidator {
	const secretKey = SecretKey.fromBytes(
		deriveEth2ValidatorKeys(masterSecretKey, validatorIndex).signing,
	);
	const pubkey = secretKey.toPublicKey().toBytes();

	return { pubkey, secretKey };
}
