import type { SecretKey } from '@chainsafe/blst';
import { PublicKey, Signature, verify } from '@chainsafe/blst';

import { CHAIN_CONFIGS } from '../chainParams';
import type { IDepositDataSignature, NetworkName } from '../interfaces';
import { importDynamic } from '../utils';

export const getDepositMessage = (pubkey: Uint8Array, withdrawal_credential: Uint8Array) => ({
	pubkey,
	withdrawalCredentials: withdrawal_credential,
	amount: 32e9,
});

/**
 * Signs a deposit data object.
 * @param pubkey The validator's public key.
 * @param secretKey The validator's secret key.
 * @param withdrawal_credential The validator's withdrawal credential.
 * @param network The network to use for signing the deposit data. Defaults to mainnet.
 * @returns The signature and deposit data root as an object.
 */
export async function signDepositData(
	pubkey: Uint8Array,
	secretKey: SecretKey,
	withdrawal_credential: Uint8Array,
	network: NetworkName = 'mainnet',
): Promise<IDepositDataSignature> {
	const { DOMAIN_DEPOSIT } = await importDynamic('@lodestar/params');
	const { ZERO_HASH, computeDomain, computeSigningRoot } = await importDynamic(
		'@lodestar/state-transition',
	);
	const { ssz } = await importDynamic('@lodestar/types');

	const depositMessage = getDepositMessage(pubkey, withdrawal_credential);
	const depositMessageRoot = ssz.phase0.DepositMessage.hashTreeRoot(depositMessage);

	const domain = computeDomain(
		DOMAIN_DEPOSIT,
		CHAIN_CONFIGS[network].GENESIS_FORK_VERSION,
		ZERO_HASH,
	);

	const signingRoot: Uint8Array = computeSigningRoot(
		ssz.phase0.DepositMessage,
		depositMessage,
		domain,
	);

	const depositData = {
		...depositMessage,
		signature: secretKey.sign(signingRoot).toBytes(),
	};

	if (
		!verify(signingRoot, PublicKey.fromBytes(pubkey), Signature.fromBytes(depositData.signature))
	) {
		throw new Error('Invalid signature');
	}

	const depositDataRoot = ssz.phase0.DepositData.hashTreeRoot(depositData);

	return {
		pubkey,
		withdrawal_credential,
		signature: depositData.signature,
		deposit_data_root: depositDataRoot,
		deposit_message_root: depositMessageRoot,
		fork_version: CHAIN_CONFIGS[network].GENESIS_FORK_VERSION,
		network,
	};
}
