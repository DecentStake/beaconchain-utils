/* eslint-disable max-len */
import { PublicKey } from '@chainsafe/blst';
import { fromHexString as b } from '@chainsafe/ssz';
import { validateMnemonic } from 'bip39';

import { SecretProvider, Validator } from '../src';
import { Chains } from '../src/chainParams';

describe('SecretProvider', () => {
	let secretProvider: SecretProvider;

	beforeEach(() => {
		secretProvider = new SecretProvider();
	});

	it('should generate a new 24 word mnemonic', async () => {
		await secretProvider.exportMnemonic((mnemonic) => {
			expect(mnemonic.split(' ').length).toEqual(24);
			expect(validateMnemonic(mnemonic)).toEqual(true);
		});
	});

	it('should be able to instance a new SecretProvider with a mnemonic', () => {
		const mnemonic =
			'sister protect peanut hill ready work profit fit wish want small inflict flip member tail between sick setup bright duck morning sell paper worry';
		const secretProviderWithMnemonic = new SecretProvider(mnemonic);
		expect(secretProviderWithMnemonic).toBeDefined();
	});

	it('should throw if the mnemonic is invalid', () => {
		const mnemonic =
			'sister peanut hill ready work profit fit wish want small inflict flip member tail between sick setup bright duck morning sell paper worry';
		expect(() => new SecretProvider(mnemonic)).toThrow('Invalid mnemonic');
	});

	it('should derive and export validators', () => {
		const validatorIndex = 0;
		const validatorKeyPair = secretProvider.deriveValidator(validatorIndex);
		const validator = new Validator(
			validatorKeyPair.secretKey.toBytes(),
			validatorIndex,
			Chains.mainnet,
		);
		expect(validatorKeyPair.pubkey).toEqual(validator.pubkey);
		expect(validatorKeyPair.pubkey).toEqual(validatorKeyPair.secretKey.toPublicKey().toBytes());

		expect(() => PublicKey.fromBytes(validatorKeyPair.pubkey).keyValidate()).not.toThrow();

		const { pubkeys, secretKeys } = secretProvider.exportValidators(0, 10);
		expect(pubkeys.length).toEqual(10);
		expect(secretKeys.length).toEqual(10);

		expect(validatorKeyPair.pubkey).toEqual(b(pubkeys[0]));
		expect(validatorKeyPair.secretKey.toBytes()).toEqual(b(secretKeys[0]));
	});
});
