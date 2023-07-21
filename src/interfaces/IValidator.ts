import type { SecretKey } from '@chainsafe/blst';

import type { Chains } from '../constants';

export interface IValidator {
	chainId: Chains;
	pubkey: Uint8Array;
	relativeValidatorIndex: number;
}

export interface IValidatorKeyPair {
	pubkey: Uint8Array;
	secretKey: SecretKey;
}
