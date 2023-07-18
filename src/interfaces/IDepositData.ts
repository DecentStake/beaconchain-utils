import type { NetworkName } from './NetworkNames.js';

export interface IDepositData {
	pubkey: string;
	withdrawal_credentials: string;
	amount: number;
	signature: string;
	deposit_message_root: string;
	deposit_data_root: string;
	fork_version: string;
	network_name: NetworkName;
}

export interface IPackedDepositData {
	pubkeys: string;
	withdrawal_credential: string;
	signatures: string;
	deposit_data_roots: string[];
}

export interface IDepositDataSignature {
	pubkey: Uint8Array;
	withdrawal_credential: Uint8Array;
	signature: Uint8Array;
	deposit_data_root: Uint8Array;
	deposit_message_root: Uint8Array;
	fork_version: Uint8Array;
	network: NetworkName;
}
