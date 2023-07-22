import type { Chains } from '../chainParams';

export type NetworkName = keyof typeof Chains;

export interface INetwork {
	name: string;
	chainId: number;
}
