import { deriveKeyFromMnemonic } from '@chainsafe/bls-keygen';
import { toHexString } from '@chainsafe/ssz';

import type { IDepositData, IPackedDepositData, NetworkName } from '../interfaces';
import { appendUint8Arrays, parseAddressToBLS } from '../utils';
import { DeriveValidator } from './DeriveValidator';
import { SignDepositData } from './SignDepositData';

/**
 * Generates a packed deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @returns {PackedDepositData} An object containing the deposit data for the given validator indexes, ready for use in the BatchDeposit contract.
 * @notice We return DepositData as an object with string properties, rather than a Uint8Array, for ease of use in back-front communication.
 */
export async function generatePackedDepositData(
	validatorMnemonic: string,
	depositor: string,
	validatorIndexes: number[],
): Promise<IPackedDepositData> {
	const withdrawalCredential = parseAddressToBLS(depositor);
	const masterSecretKey: Uint8Array = deriveKeyFromMnemonic(validatorMnemonic);

	let packedPubkeys = new Uint8Array();
	let packedSignatures = new Uint8Array();
	const depositDataRoots: string[] = [];

	for (const validatorIndex of validatorIndexes) {
		const { pubkey, secretKey } = DeriveValidator(masterSecretKey, validatorIndex);

		/* eslint-disable no-await-in-loop */
		const { signature, deposit_data_root: depositDataRoot } = await SignDepositData(
			pubkey,
			withdrawalCredential,
			secretKey,
		);

		packedPubkeys = appendUint8Arrays(packedPubkeys, pubkey);
		packedSignatures = appendUint8Arrays(packedSignatures, signature);
		depositDataRoots.push(toHexString(depositDataRoot));
	}

	return {
		pubkeys: toHexString(packedPubkeys),
		withdrawal_credential: toHexString(withdrawalCredential),
		signatures: toHexString(packedSignatures),
		deposit_data_roots: depositDataRoots,
	} as IPackedDepositData;
}

/**
 * Generates deposit data for a given set of validator indexes, a given seed phrase, and a given execution layer address.
 * @param {string} validatorMnemonic Seed phrase of the validator.
 * @param {string} depositor Execution layer address of the depositor.
 * @param {number[]} validatorIndexes Array of numbers representing the validator indexes to generate deposit data for.
 * @param {NetworkNames} network Name of the network to generate deposit data for.
 * @returns {DepositData[]} An array of depositData objects, similar to what deposit_cli outputs.
 */
export async function generateDepositData(
	validatorMnemonic: string,
	depositor: string,
	validatorIndexes: number[],
	network: NetworkName = 'mainnet',
): Promise<IDepositData[]> {
	const withdrawalCredential = parseAddressToBLS(depositor);
	const masterSecretKey = deriveKeyFromMnemonic(validatorMnemonic);

	const depositDataPromises = validatorIndexes.map(async (validatorIndex) => {
		const { pubkey, secretKey } = DeriveValidator(masterSecretKey, validatorIndex);

		const {
			signature,
			deposit_data_root: depositDataRoot,
			deposit_message_root: depositMessageRoot,
			fork_version: forkVersion,
		} = await SignDepositData(pubkey, withdrawalCredential, secretKey);

		return {
			pubkey: toHexString(pubkey).slice(2),
			withdrawal_credentials: toHexString(withdrawalCredential).slice(2),
			amount: 32e9,
			signature: toHexString(signature).slice(2),
			deposit_message_root: toHexString(depositMessageRoot).slice(2),
			deposit_data_root: toHexString(depositDataRoot).slice(2),
			fork_version: toHexString(forkVersion).slice(2),
			network_name: network,
		} as IDepositData;
	});

	return Promise.all(depositDataPromises);
}
