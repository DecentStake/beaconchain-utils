import type { NetworkName } from '../interfaces';

export enum Chains {
	mainnet = 1,
	goerli = 5,
}

/**
 * Get the name of a chain given its chainId.
 * @param chainId The chainId to get the name of.
 * @returns The name of the chain.
 */
export const getChainName = (chainId: number): NetworkName => Chains[chainId] as NetworkName;
