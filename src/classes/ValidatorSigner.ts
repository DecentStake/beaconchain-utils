import { SignDepositData } from '../eth2/SignDepositData';
import type { IDepositDataSignature, NetworkName } from '../interfaces';
import { SecretKeyProvider } from './SecretKeyProvider';

export class ValidatorSigner {
	readonly network: NetworkName;

	private readonly secretKeyProvider: SecretKeyProvider;

	/**
	 * Creates a new ValidatorSigner given a mnemonic.
	 * If no mnemonic is provided, a random 24 word mnemonic will be generated.
	 * @param {string} mnemonic The mnemonic to use for deriving the validator's secret key.
	 * @param {NetworkName} network The network to use for signing the deposit data. Defaults to mainnet.
	 * @throws Will throw an error if the mnemonic is invalid.
	 */
	constructor(mnemonic?: string, network: NetworkName = 'mainnet') {
		this.secretKeyProvider = new SecretKeyProvider(mnemonic);
		this.network = network;
	}

	/**
	 * Signs the deposit data for a validator given the validator's withdrawal credential and index.
	 * @param {Uint8Array} withdrawalCredential The validator's withdrawal credential.
	 * @param {number} validatorIndex The index of the validator to sign the deposit data for.
	 * @returns {IDepositDataSignature} The signature of the deposit data.
	 */
	async SignDepositData(
		withdrawalCredential: Uint8Array,
		validatorIndex: number,
	): Promise<IDepositDataSignature> {
		const { pubkey, secretKey } = this.secretKeyProvider.deriveValidator(validatorIndex);

		return SignDepositData(pubkey, secretKey, withdrawalCredential, this.network);
	}

	/**
	 * Batch version of `SignDepositData`.
	 * Signs the deposit data for a batch of validators given the validators' withdrawal credentials and indexes.
	 * @param {Uint8Array} withdrawalCredential The validators' withdrawal credentials.
	 * @param {Array<number>} validatorIndexes The indexes of the validators to sign the deposit data for.
	 * @returns {Array<IDepositDataSignature>} The signatures of the deposit data.
	 */
	async SignDepositDataBatch(
		withdrawalCredential: Uint8Array,
		validatorIndexes: number[],
	): Promise<IDepositDataSignature[]> {
		return Promise.all(
			validatorIndexes.map(async (validatorIndex) => {
				const { pubkey, secretKey } = this.secretKeyProvider.deriveValidator(validatorIndex);

				return SignDepositData(pubkey, secretKey, withdrawalCredential, this.network);
			}),
		);
	}
}
