import type { IKeystore } from '@chainsafe/bls-keystore';
import { Keystore } from '@chainsafe/bls-keystore';
import { SecretKey } from '@chainsafe/blst';

import type { Chains } from '../constants';
import { signDepositData } from '../eth2/SignDepositData';
import type { IDepositDataSignature, INetwork, IValidator } from '../interfaces';
import { getChainName } from '../utils';

export class Validator implements IValidator {
	chainId: Chains;

	pubkey: Uint8Array;

	relativeValidatorIndex: number;

	private readonly secretKey: SecretKey;

	/**
	 * Creates a new ValidatorSigner given a mnemonic.
	 * If no mnemonic is provided, a random 24 word mnemonic will be generated.
	 * @param secretKey The secret key to use for signing the deposit data.
	 * @param relativeValidatorIndex The validator's relative index, used for EIP-2334 path derivation.
	 * @param chainId The chainId to use for signing the deposit data.
	 * @throws Will throw an error if the mnemonic is invalid.
	 */
	constructor(secretKey: Uint8Array, relativeValidatorIndex: number, chainId: number) {
		this.secretKey = SecretKey.fromBytes(secretKey);
		this.pubkey = this.secretKey.toPublicKey().toBytes();
		this.relativeValidatorIndex = relativeValidatorIndex;
		this.chainId = chainId;
	}

	/**
	 * Returns the network the validator is set to sign for.
	 * @returns The network the validator is set to sign for as an INetwork object.
	 */
	get network(): INetwork {
		return {
			name: getChainName(this.chainId),
			chainId: this.chainId,
		};
	}

	/**
	 * Signs the deposit data for a validator given the validator's withdrawal credential and index.
	 * @param withdrawalCredential The validator's withdrawal credential.
	 * @returns The signature of the deposit data.
	 */
	async signDepositData(withdrawalCredential: Uint8Array): Promise<IDepositDataSignature> {
		return signDepositData(
			this.pubkey,
			this.secretKey,
			withdrawalCredential,
			getChainName(this.chainId),
		);
	}

	/**
	 * Generates a keystore for the validator.
	 * @param password The password to encrypt the keystore with.
	 * @returns The generated keystore.
	 * @throws Will throw an error if the password is invalid.
	 */
	async generateKeystore(password: string | Uint8Array): Promise<IKeystore> {
		return Keystore.create(
			password,
			this.secretKey.toBytes(),
			this.pubkey,
			`m/12381/3600/${this.relativeValidatorIndex}/0/0`,
		);
	}
}
