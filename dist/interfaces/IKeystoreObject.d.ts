declare type CheckSumParamsKeys = number | string;
declare type CheckSumParamsValues = number | string;
export interface IKeystoreObject {
    version: number;
    uuid: string;
    path: string;
    pubkey: string;
    crypto: {
        kdf: {
            function: string;
            params: {
                dklen: number;
                c: number;
                prf: string;
                salt: string;
            };
            message: string;
        };
        checksum: {
            function: string;
            params: Record<CheckSumParamsKeys, CheckSumParamsValues>;
            message: string;
        };
        cipher: {
            function: string;
            params: {
                iv: string;
            };
            message: string;
        };
    };
}
export {};
