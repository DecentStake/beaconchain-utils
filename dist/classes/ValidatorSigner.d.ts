import type { IDepositDataSignature, NetworkName } from '../interfaces';
export declare class ValidatorSigner {
    readonly pubkey: Uint8Array;
    readonly network: NetworkName;
    private readonly secretKey;
    private readonly validatorIndex;
    constructor(masterSecretKey: Uint8Array, validatorIndex: number, network?: NetworkName);
    get ValidatorIndex(): number;
    SignDepositData(withdrawal_credential: Uint8Array): Promise<IDepositDataSignature>;
}
