import { fromHexString as b } from '@chainsafe/ssz';
import { isAddress } from 'web3-validator';

import { Chains } from '../constants';
import type { NetworkName } from '../interfaces';

/**
 * Utility function to append two Uint8Arrays.
 * @param array1 The first Uint8Array.
 * @param array2 The second Uint8Array.
 * @returns The concatenated Uint8Array.
 */
export const appendUint8Arrays = (array1: Uint8Array, array2: Uint8Array) => {
	const tmp = new Uint8Array(array1.length + array2.length);
	tmp.set(array1, 0);
	tmp.set(array2, array1.length);

	return tmp;
};

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

/**
 * Get the name of a chain given its chainId.
 * @param chainId The chainId to get the name of.
 * @returns The name of the chain.
 */
export const getChainName = (chainId: number): NetworkName => Chains[chainId] as NetworkName;

// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
export const importDynamic = new Function('modulePath', 'return import(modulePath)');
