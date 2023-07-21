import type { Chains } from '../constants';

export type NetworkName = keyof typeof Chains;

export interface INetwork {
	name: string;
	chainId: number;
}
