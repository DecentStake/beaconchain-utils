import { deriveEth2ValidatorKeys } from '@chainsafe/bls-keygen';
import { SecretKey } from '@chainsafe/blst';

import type { IValidatorKeyPair } from '../interfaces';

/**
 * Derive a validator's secret key and public key from a master secret key and validator index.
 * @param masterSecretKey The master secret key.
 * @param validatorIndex The validator index.
 * @returns The validator's secret key and public key as an object.
 */
export function deriveValidator(
	masterSecretKey: Uint8Array,
	validatorIndex: number,
): IValidatorKeyPair {
	const secretKey = SecretKey.fromBytes(
		deriveEth2ValidatorKeys(masterSecretKey, validatorIndex).signing,
	);
	const pubkey = secretKey.toPublicKey().toBytes();

	return { pubkey, secretKey };
}
