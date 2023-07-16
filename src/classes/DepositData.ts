import type { NetworkName } from '../interfaces';

export class DepositData {
	pubkey: string;

	withdrawal_credentials: string;

	amount: number;

	signature: string;

	deposit_message_root: string;

	deposit_data_root: string;

	fork_version: string;

	network_name: NetworkName;

	constructor(data: {
		pubkey: string;
		withdrawal_credentials: string;
		amount: number;
		signature: string;
		deposit_message_root: string;
		deposit_data_root: string;
		fork_version: string;
		network_name: NetworkName;
	}) {
		this.pubkey = data.pubkey;
		this.withdrawal_credentials = data.withdrawal_credentials;
		this.amount = data.amount;
		this.signature = data.signature;
		this.deposit_message_root = data.deposit_message_root;
		this.deposit_data_root = data.deposit_data_root;
		this.fork_version = data.fork_version;
		this.network_name = data.network_name;
	}
}

export class PackedDepositData {
	pubkeys: string;

	withdrawal_credential: string;

	signatures: string;

	deposit_data_roots: string[];

	constructor(data: {
		pubkeys: string;
		withdrawal_credential: string;
		signatures: string;
		deposit_data_roots: string[];
	}) {
		this.pubkeys = data.pubkeys;
		this.withdrawal_credential = data.withdrawal_credential;
		this.signatures = data.signatures;
		this.deposit_data_roots = data.deposit_data_roots;
	}
}
