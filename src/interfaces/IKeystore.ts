// Code refactored from @chainsafe/bls-keystore
export interface IKeystore {
	version: number;
	uuid: string;
	description?: string;
	path: string;
	pubkey: string;
	crypto: {
		kdf: IKdfModule;
		checksum: IChecksumModule;
		cipher: ICipherModule;
	};
}
export type IKdfModule = IPbkdf2KdfModule | IScryptKdfModule;
export interface IPbkdf2KdfModule {
	function: 'pbkdf2';
	params: {
		dklen: number;
		c: number;
		prf: 'hmac-sha256';
		salt: string;
	};
	message: '';
}

export interface IScryptKdfModule {
	function: 'scrypt';
	params: {
		dklen: number;
		n: number;
		p: number;
		r: number;
		salt: string;
	};
	message: '';
}
export interface IChecksumModule {
	function: 'sha256';
	params: unknown;
	message: string;
}

export interface ICipherModule {
	function: 'aes-128-ctr';
	params: {
		iv: string;
	};
	message: string;
}
export interface IAes128CtrCipherModule {
	function: 'aes-128-ctr';
	params: {
		iv: string;
	};
	message: string;
}

export interface IKeystoreObject {
	keystores: IKeystore[];
	password: string;
}
