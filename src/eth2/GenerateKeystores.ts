import type { IKeystore } from '@chainsafe/bls-keystore';
import { Keystore } from '@chainsafe/bls-keystore';

import { DeriveValidator } from './DeriveValidator';

/**
 * Generates keystores for a range of validator indexes, given a master secret key and a password.
 * @param {string} password The password to encrypt the keystores with.
 * @param {number[]} validatorIndexes The range of validator indexes to generate keystores for.
 * @param {Uint8Array} masterSecretKey The master secret key to derive the validator secret keys from.
 * @returns {IKeystore[]} An array of keystores for the given validator indexes.
 */
export async function GenerateKeystores(
	password: string,
	validatorIndexes: number[],
	masterSecretKey: Uint8Array,
): Promise<IKeystore[]> {
	const keystorePromises = validatorIndexes.map(async (validatorIndex) => {
		const { secretKey, pubkey } = DeriveValidator(masterSecretKey, validatorIndex);

		return Keystore.create(
			password,
			secretKey.toBytes(),
			pubkey,
			`m/12381/3600/${validatorIndex}/0/0`,
		);
	});

	return Promise.all(keystorePromises);
}
