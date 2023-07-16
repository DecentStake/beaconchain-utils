import type { SecretKey } from '@chainsafe/blst';

import { DeriveValidator } from '../eth2/DeriveValidator';
import { SignDepositData } from '../eth2/SignDepositData';
import type { IDepositDataSignature, NetworkName } from '../interfaces';

export class ValidatorSigner {
	readonly pubkey: Uint8Array;

	readonly network: NetworkName;

	private readonly secretKey: SecretKey;

	private readonly validatorIndex: number;

	constructor(
		masterSecretKey: Uint8Array,
		validatorIndex: number,
		network: NetworkName = 'mainnet',
	) {
		const { secretKey, pubkey } = DeriveValidator(masterSecretKey, validatorIndex);
		this.pubkey = pubkey;
		this.secretKey = secretKey;
		this.validatorIndex = validatorIndex;
		this.network = network;
	}

	get ValidatorIndex(): number {
		return this.validatorIndex;
	}

	async SignDepositData(withdrawal_credential: Uint8Array): Promise<IDepositDataSignature> {
		return SignDepositData(this.pubkey, withdrawal_credential, this.secretKey, this.network);
	}
}
