import type { SecretKey } from '@chainsafe/blst';

import { CHAIN_CONFIGS } from '../constants';
import type { IDepositDataSignature, NetworkName } from '../interfaces';
import { importDynamic } from '../utils';
import { getDepositMessage } from '../utils/signing';

/**
 * Signs a deposit data object.
 * @param {Uint8Array} pubkey The validator's public key.
 * @param {Uint8Array} withdrawal_credential The validator's withdrawal credential.
 * @param {SecretKey} secretKey The validator's secret key.
 * @returns {DepositDataSignature} The signature and deposit data root as an object.
 */
export async function SignDepositData(
	pubkey: Uint8Array,
	withdrawal_credential: Uint8Array,
	secretKey: SecretKey,
	network: NetworkName = 'mainnet',
): Promise<IDepositDataSignature> {
	const { config } = await importDynamic('@lodestar/config/default');
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
	const depositDataRoot = ssz.phase0.DepositData.hashTreeRoot(depositData);

	return {
		signature: depositData.signature,
		deposit_data_root: depositDataRoot,
		deposit_message_root: depositMessageRoot,
		fork_version: config.GENESIS_FORK_VERSION,
	} as IDepositDataSignature;
}
