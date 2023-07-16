"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackedDepositData = exports.DepositData = void 0;
var DepositData = /** @class */ (function () {
    function DepositData(data) {
        this.pubkey = data.pubkey;
        this.withdrawal_credentials = data.withdrawal_credentials;
        this.amount = data.amount;
        this.signature = data.signature;
        this.deposit_message_root = data.deposit_message_root;
        this.deposit_data_root = data.deposit_data_root;
        this.fork_version = data.fork_version;
        this.network_name = data.network_name;
    }
    return DepositData;
}());
exports.DepositData = DepositData;
var PackedDepositData = /** @class */ (function () {
    function PackedDepositData(data) {
        this.pubkeys = data.pubkeys;
        this.withdrawal_credential = data.withdrawal_credential;
        this.signatures = data.signatures;
        this.deposit_data_roots = data.deposit_data_roots;
    }
    return PackedDepositData;
}());
exports.PackedDepositData = PackedDepositData;
