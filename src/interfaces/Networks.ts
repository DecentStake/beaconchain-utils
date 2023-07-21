export enum Chains {
	mainnet = 1,
	goerli = 5,
}

export type NetworkName = keyof typeof Chains;

export interface INetwork {
	name: string;
	chainId: number;
}
