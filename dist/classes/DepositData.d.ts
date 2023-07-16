import type { NetworkName } from '../interfaces';
export declare class DepositData {
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
    });
}
export declare class PackedDepositData {
    pubkeys: string;
    withdrawal_credential: string;
    signatures: string;
    deposit_data_roots: string[];
    constructor(data: {
        pubkeys: string;
        withdrawal_credential: string;
        signatures: string;
        deposit_data_roots: string[];
    });
}
