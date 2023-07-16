export const getDepositMessage = (pubkey: Uint8Array, withdrawal_credential: Uint8Array) => ({
	pubkey,
	withdrawalCredentials: withdrawal_credential,
	amount: 32e9,
});
