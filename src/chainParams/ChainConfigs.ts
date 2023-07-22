import { fromHexString as b } from '@chainsafe/ssz';

export const CHAIN_CONFIGS = {
	mainnet: {
		GENESIS_FORK_VERSION: b('00000000'),
		GENESIS_VALIDATORS_ROOT: b('4b363db94e286120d76eb905340fdd4e54bfe9f06bf33ff6cf5ad27f511bfe95'),
	},
	goerli: {
		GENESIS_FORK_VERSION: b('00001020'),
		GENESIS_VALIDATORS_ROOT: b('043db0d9a83813551ee2f33450d23797757d430911a9320530ad8a0eabc43efb'),
	},
};
