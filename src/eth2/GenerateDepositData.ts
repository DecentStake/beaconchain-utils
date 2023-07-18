import { toHexString } from '@chainsafe/ssz';

import type { IDepositData, IDepositDataSignature, IPackedDepositData } from '../interfaces';
import { appendUint8Arrays } from '../utils';

/**
 * Generates a packed deposit data for a given deposit data signatures.
 * @param {IDepositDataSignature[]} depositDataSignatures Signed deposit data objects.
 * @returns {PackedDepositData} An object containing the deposit data for the given validator indexes, ready for use in the BatchDeposit contract.
 * @notice We return DepositData as an object with string properties, rather than a Uint8Array, for ease of use in back-front communication.
 */
export function generatePackedDepositData(
	depositDataSignatures: IDepositDataSignature[],
): IPackedDepositData {
	let packedPubkeys = new Uint8Array();
	let packedSignatures = new Uint8Array();
	const depositDataRoots: string[] = [];

	for (const depositDataSignature of depositDataSignatures) {
		packedPubkeys = appendUint8Arrays(packedPubkeys, depositDataSignature.pubkey);
		packedSignatures = appendUint8Arrays(packedSignatures, depositDataSignature.signature);
		depositDataRoots.push(toHexString(depositDataSignature.deposit_data_root));
	}

	return {
		pubkeys: toHexString(packedPubkeys),
		withdrawal_credential: toHexString(depositDataSignatures[0].withdrawal_credential),
		signatures: toHexString(packedSignatures),
		deposit_data_roots: depositDataRoots,
	} as IPackedDepositData;
}

/**
 * Generates deposit data for a given deposit data signatures.
 * @param {IDepositDataSignature[]} depositDataSignatures Signed deposit data objects.
 * @returns {DepositData[]} An array of depositData objects, similar to what deposit_cli outputs.
 */
export function generateDepositData(
	depositDataSignatures: IDepositDataSignature[],
): IDepositData[] {
	return depositDataSignatures.map((depositDataSignature) => ({
		pubkey: toHexString(depositDataSignature.pubkey).slice(2),
		withdrawal_credentials: toHexString(depositDataSignature.withdrawal_credential).slice(2),
		amount: 32e9,
		signature: toHexString(depositDataSignature.signature).slice(2),
		deposit_message_root: toHexString(depositDataSignature.deposit_message_root).slice(2),
		deposit_data_root: toHexString(depositDataSignature.deposit_data_root).slice(2),
		fork_version: toHexString(depositDataSignature.fork_version).slice(2),
		network_name: depositDataSignature.network,
	}));
}
