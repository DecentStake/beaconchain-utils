/* eslint-disable max-len */
import {
	/* generateDepositData,
	generatePackedDepositData,
	parseAddressToBLS, */
	SecretProvider,
	Validator,
} from '../src';
import { Chains } from '../src/chainParams';

describe('Validator', () => {
	let validator: Validator;
	let secretProvider: SecretProvider;

	beforeEach(() => {
		const mnemonic =
			'sister protect peanut hill ready work profit fit wish want small inflict flip member tail between sick setup bright duck morning sell paper worry';
		secretProvider = new SecretProvider(mnemonic);
		const validatorIndex = 0;
		validator = new Validator(
			secretProvider.deriveValidator(validatorIndex).secretKey.toBytes(),
			validatorIndex,
			Chains.mainnet,
		);
	});

	it('should return the correct network', () => {
		expect(validator.network).toEqual({
			name: 'mainnet',
			chainId: Chains.mainnet,
		});
	});

	/* it('should sign deposit data => generate deposit data', () => {
		const withdrawalCredential: Uint8Array = parseAddressToBLS(
			'0x8FB40436758Ea9e1a8317f54293Af74be02faFf0',
		);
		let depositData;
		let packedDepositData;
		validator
			.signDepositData(withdrawalCredential)
			.then((signature) => {
				depositData = generateDepositData([signature]);
				packedDepositData = generatePackedDepositData([signature]);
			})
			.catch((error) => {
				throw error;
			});
		expect(depositData).toEqual({
			pubkey:
				'8139417a8383bcf1ab4cfa00936dd0d4fb4a46b4194a73a2a1db441919441ff38ed16510aed7f978594f9f09b569b342',
			withdrawal_credentials: '0100000000000000000000008fb40436758ea9e1a8317f54293af74be02faff0',
			amount: 32_000_000_000,
			signature:
				'8d5867ec743fa3424185e87c7b2e45044a94dee270a083a991b48f3855af235670cc868e7d64c9754ab1c95bf44c88a618c996825f8151672d7433a84dad718a3aa51b099de52376c36fc41d9df36a4bcbf8ccf5868ca32c556865a1dc82647a',
			deposit_message_root: 'eb8e2a77bedf08720ee7e95f9b99dd7d077488725790d1894fc7e605888aa846',
			deposit_data_root: '335f71556319ca0ef4352dc37ca54d251ae3a2ef1a9c67ab93b73a9dd8b77a60',
			fork_version: '00000000',
			network_name: 'mainnet',
		});
		expect(packedDepositData).toEqual({
			pubkeys:
				'0x8139417a8383bcf1ab4cfa00936dd0d4fb4a46b4194a73a2a1db441919441ff38ed16510aed7f978594f9f09b569b342',
			withdrawal_credential: '0x0100000000000000000000008fb40436758ea9e1a8317f54293af74be02faff0',
			signatures:
				'0x8d5867ec743fa3424185e87c7b2e45044a94dee270a083a991b48f3855af235670cc868e7d64c9754ab1c95bf44c88a618c996825f8151672d7433a84dad718a3aa51b099de52376c36fc41d9df36a4bcbf8ccf5868ca32c556865a1dc82647a',
			deposit_data_roots: ['0x335f71556319ca0ef4352dc37ca54d251ae3a2ef1a9c67ab93b73a9dd8b77a60'],
		});
	}); */
});
