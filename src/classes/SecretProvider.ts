import { deriveKeyFromMnemonic, eth2ValidatorPaths } from '@chainsafe/bls-keygen';
import { toHexString } from '@chainsafe/ssz';
import { generateMnemonic, validateMnemonic } from 'bip39';

import { deriveValidator, generateKeystores } from '../eth2';
import type { IKeystoreObject, IValidatorKeyPair, IValidatorKeysPath } from '../interfaces';
import { arrayFromRange } from '../utils';

export class SecretProvider {
	private readonly mnemonic: string;

	private readonly secretKey: Uint8Array;

	/**
	 * Creates a new SecretProvider given a mnemonic.
	 * If no mnemonic is provided, a random 24 word mnemonic will be generated.
	 * @param mnemonic The mnemonic to use for deriving the validator's secret key.
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
	 * @param validatorIndex The index of the validator to derive the secret key and public key for.
	 * @returns The derived validator's secret key and public key.
	 */
	deriveValidator(validatorIndex: number): IValidatorKeyPair {
		return deriveValidator(this.secretKey, validatorIndex);
	}

	/**
	 * Derives a list of validators' secret keys and public keys from a list of validator indexes.
	 * @param startIndex The index of the first validator to derive the secret key and public key for.
	 * @param numberOfValidators The number of validators to derive secret keys and public keys for. (starting from startIndex)
	 * @returns The derived validators' secret keys and public keys as hex strings.
	 */
	exportValidators(
		startIndex: number,
		numberOfValidators: number,
	): { pubkeys: string[]; secretKeys: string[] } {
		const validatorIndexes = arrayFromRange(startIndex, numberOfValidators);

		const pubkeys: string[] = [];
		const secretKeys: string[] = [];

		for (const validatorIndex of validatorIndexes) {
			const { pubkey, secretKey } = this.deriveValidator(validatorIndex);
			pubkeys.push(toHexString(pubkey));
			secretKeys.push(toHexString(secretKey.toBytes()));
		}

		return {
			pubkeys,
			secretKeys,
		};
	}

	/**
	 * Generates keystores for the given validator indexes.
	 * @param startIndex The index of the first validator to generate a keystore for.
	 * @param numberOfValidators The number of validators to generate keystores for. (starting from startIndex)
	 * @param password The password to encrypt the keystores with.
	 * @returns The generated keystores and the password used to encrypt them.
	 */
	async generateKeystores(
		startIndex: number,
		numberOfValidators: number,
		password: string,
	): Promise<IKeystoreObject> {
		const keystores = await generateKeystores(
			startIndex,
			numberOfValidators,
			password,
			this.secretKey,
		);

		return { keystores, password };
	}

	/**
	 * Executes a callback function with the mnemonic as a parameter. Useful for exporting the mnemonic to a KMS.
	 * @param callBack The callback function to execute with the mnemonic as a parameter.
	 * @returns void.
	 */
	exportMnemonic(callBack: (mnemonic: string) => void): void | Promise<void> {
		return callBack(this.mnemonic);
	}

	/**
	 * Executes a callback function with the secret key as a parameter. Useful for exporting the secret key to a KMS.
	 * @param callBack The callback function to execute with the secret key as a parameter.
	 * @returns void.
	 */
	exportSecretKey(callBack: (secretKey: Uint8Array) => void): void | Promise<void> {
		return callBack(this.secretKey);
	}

	/**
	 * Gets the EIP-2334 path for the given validator index
	 * @param validatorIndex The index of the validator to get the EIP-2334 path for.
	 * @returns TheEIP-2334 path for the given validator index.
	 */
	validatorPath(validatorIndex: number): IValidatorKeysPath {
		return eth2ValidatorPaths(validatorIndex);
	}
}
