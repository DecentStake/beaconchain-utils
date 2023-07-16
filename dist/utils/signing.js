"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepositMessage = void 0;
var getDepositMessage = function (pubkey, withdrawal_credential) { return ({
    pubkey: pubkey,
    withdrawalCredentials: withdrawal_credential,
    amount: 32e9,
}); };
exports.getDepositMessage = getDepositMessage;
