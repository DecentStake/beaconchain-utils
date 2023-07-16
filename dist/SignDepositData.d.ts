import type { SecretKey } from '@chainsafe/blst';
import type { IDepositDataSignature, NetworkName } from './interfaces';
/**
 * Signs a deposit data object.
 * @param {Uint8Array} pubkey The validator's public key.
 * @param {Uint8Array} withdrawal_credential The validator's withdrawal credential.
 * @param {SecretKey} secretKey The validator's secret key.
 * @returns {DepositDataSignature} The signature and deposit data root as an object.
 */
export declare function SignDepositData(pubkey: Uint8Array, withdrawal_credential: Uint8Array, secretKey: SecretKey, network?: NetworkName): Promise<IDepositDataSignature>;
