import type { IDepositData, IPackedDepositData, NetworkName } from './interfaces';
/**
 * Generates a packed deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @returns {PackedDepositData} An object containing the deposit data for the given validator indexes, ready for use in the BatchDeposit contract.
 * @notice We return DepositData as an object with string properties, rather than a Uint8Array, for ease of use in back-front communication.
 */
export declare function generatePackedDepositData(validatorMnemonic: string, depositor: string, validatorIndexes: number[]): Promise<IPackedDepositData>;
/**
 * Generates deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @param {NetworkNames} network Name of the network to generate deposit data for.
 * @returns {DepositData[]} An array of depositData objects, similar to what deposit_cli outputs.
 */
export declare function generateDepositData(validatorMnemonic: string, depositor: string, validatorIndexes: number[], network?: NetworkName): Promise<IDepositData[]>;
