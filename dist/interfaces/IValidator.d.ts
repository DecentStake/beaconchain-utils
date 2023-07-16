import type { SecretKey } from '@chainsafe/blst';
export interface IValidator {
    secretKey: SecretKey;
    pubkey: Uint8Array;
}
