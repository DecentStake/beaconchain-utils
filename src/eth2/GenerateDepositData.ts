import type { IDepositData, IDepositDataSignature, IPackedDepositData } from '../interfaces';
import { appendUint8Arrays, hexStringFromBytes } from '../TypedArrayUtils';

/**
 * Generates a packed deposit data for a given deposit data signatures.
 * DepositData is an object with string properties, rather than a Uint8Array, for ease of use in back-front communication.
 * @param depositDataSignatures Signed deposit data objects.
 * @returns An object containing the deposit data for the given validator indexes, ready for use in the BatchDeposit contract.
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
		depositDataRoots.push(hexStringFromBytes(depositDataSignature.deposit_data_root));
	}

	return {
		pubkeys: hexStringFromBytes(packedPubkeys),
		withdrawal_credential: hexStringFromBytes(depositDataSignatures[0].withdrawal_credential),
		signatures: hexStringFromBytes(packedSignatures),
		deposit_data_roots: depositDataRoots,
	} as IPackedDepositData;
}

/**
 * Generates deposit data for a given deposit data signatures.
 * @param depositDataSignatures Signed deposit data objects.
 * @returns An array of depositData objects, similar to what deposit_cli outputs.
 */
export function generateDepositData(
	depositDataSignatures: IDepositDataSignature[],
): IDepositData[] {
	return depositDataSignatures.map((depositDataSignature) => ({
		pubkey: hexStringFromBytes(depositDataSignature.pubkey).slice(2),
		withdrawal_credentials: hexStringFromBytes(depositDataSignature.withdrawal_credential).slice(2),
		amount: 32e9,
		signature: hexStringFromBytes(depositDataSignature.signature).slice(2),
		deposit_message_root: hexStringFromBytes(depositDataSignature.deposit_message_root).slice(2),
		deposit_data_root: hexStringFromBytes(depositDataSignature.deposit_data_root).slice(2),
		fork_version: hexStringFromBytes(depositDataSignature.fork_version).slice(2),
		network_name: depositDataSignature.network,
	}));
}
