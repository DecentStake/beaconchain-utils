import { fromHexString as b } from '@chainsafe/ssz';
import { isAddress } from 'web3-validator';

/**
 * Parse an Ethereum address to a BLS execution layer withdrawal credential.
 * @param address The Ethereum address to parse.
 * @returns The BLS execution layer withdrawal credential as a Uint8Array.
 */
export const parseAddressToBLS = (address: string): Uint8Array => {
	if (!isAddress(address)) {
		throw new Error('Address is not checksummed');
	}

	return b(`0x010000000000000000000000${address.replace('0x', '')}`);
};
