import { deriveKeyFromMnemonic, eth2ValidatorPaths } from '@chainsafe/bls-keygen';
import { generateMnemonic, validateMnemonic } from 'bip39';
import type { IKeystoreObject, IValidator, IValidatorKeysPath } from 'src/interfaces';

import { DeriveValidator, GenerateKeystores } from '../eth2';

export class SecretKeyProvider {
	private readonly mnemonic: string;

	private readonly secretKey: Uint8Array;

	/**
	 * Creates a new SecretKeyProvider given a mnemonic.
	 * If no mnemonic is provided, a random 24 word mnemonic will be generated.
	 * @param {string} mnemonic The mnemonic to use for deriving the validator's secret key.
	 * @throws Will throw an error if the mnemonic is invalid.
	 */
	constructor(mnemonic?: string) {
		if (mnemonic && !validateMnemonic(mnemonic)) {
			throw new Error('Invalid mnemonic');
		}

		this.mnemonic = mnemonic || generateMnemonic(256);
		this.secretKey = deriveKeyFromMnemonic(this.mnemonic);
	}

	/**
	 * Derives a validator's secret key and public key from a validator index.
	 * @param {number} validatorIndex The index of the validator to derive the secret key and public key for.
	 * @returns {IValidator} The derived validator's secret key and public key.
	 */
	deriveValidator(validatorIndex: number): IValidator {
		return DeriveValidator(this.secretKey, validatorIndex);
	}

	/**
	 * Generates keystores for the given validator indexes.
	 * @param {string} password The password to encrypt the keystores with.
	 * @param {Array<number>} validatorIndexes The indexes of the validators to generate keystores for.
	 * @returns {Promise<IKeystoreObject>} The generated keystores and the password used to encrypt them.
	 */
	async generateKeystores(password: string, validatorIndexes: number[]): Promise<IKeystoreObject> {
		const keystores = await GenerateKeystores(password, validatorIndexes, this.secretKey);

		return { keystores, password };
	}

	/**
	 * Gets the bip39 path for the given validator index
	 * @param {number} validatorIndex The index of the validator to get the bip39 path for.
	 * @returns {string} The bip39 path for the given validator index.
	 */
	validatorPath(validatorIndex: number): IValidatorKeysPath {
		return eth2ValidatorPaths(validatorIndex);
	}
}
