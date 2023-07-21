import type { IKeystore } from '@chainsafe/bls-keystore';
import { Keystore } from '@chainsafe/bls-keystore';

import { deriveValidator } from './DeriveValidator';

/**
 * Generates keystores for a range of validator indexes, given a master secret key and a password.
 * @param startIndex The index of the first validator to generate a keystore for.
 * @param numberOfValidators The number of validators to generate keystores for. (starting from startIndex).
 * @param password The password to encrypt the keystores with.
 * @param masterSecretKey The master secret key to derive the validator secret keys from.
 * @returns An array of keystores for the given validator indexes.
 */
export async function generateKeystores(
	startIndex: number,
	numberOfValidators: number,
	password: string | Uint8Array,
	masterSecretKey: Uint8Array,
): Promise<IKeystore[]> {
	const validatorIndexes = Array.from(
		{ length: numberOfValidators },
		(_, index) => startIndex + index,
	);
	const keystorePromises = validatorIndexes.map(async (validatorIndex) => {
		const { secretKey, pubkey } = deriveValidator(masterSecretKey, validatorIndex);

		return Keystore.create(
			password,
			secretKey.toBytes(),
			pubkey,
			`m/12381/3600/${validatorIndex}/0/0`,
		);
	});

	return Promise.all(keystorePromises);
}
