import type { IKeystore } from '@chainsafe/bls-keystore';

export interface IKeystoreObject {
	keystores: IKeystore[];
	password: string;
}
