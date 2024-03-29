# `BeaconChain Utils`
[![Module type: CJS](https://img.shields.io/badge/module%20type-cjs-brightgreen)](https://github.com/voxpelli/badges-cjs-esm) ![node 18.x](https://camo.githubusercontent.com/ad21f4a73ca80151771ccbafeea2a7622152ea07cecbd9c92cd7c08137e005a1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652d31382e782d677265656e)  [![npm version](https://badge.fury.io/js/@decentstake%2Fbeaconchain-utils.svg)](https://badge.fury.io/js/@decentstake%2Fbeaconchain-utils)

This package contains typescript utilities for working with the Eth2 Beacon Chain, wrapping around [@Lodestar](https://github.com/ChainSafe/lodestar) and [@Chainsafe](https://github.com/ChainSafe) packages.

## Installation

```bash
npm install @decentstake/beaconchain-utils
```

## Usage

* __Sign and create a DepositData object with a BIP39 mnemonic:__

```typescript
import {
    generateDepositData,
    generatePackedDepositData,
    parseAddressToBLS,
    Validator,
    SecretProvider
} from '@decentstake/beaconchain-utils';

import type {
	IDepositData,
	IDepositDataSignature,
	IPackedDepositData
} from '@decentstake/beaconchain-utils/interfaces';

import { Chains } from '@decentstake/beaconchain-utils/chainParams';

const mnemonic: string = 'sister protect...'
const withdrawal_credential: Uint8Array = parseAddressToBLS('0x8FB4...');
const validatorIndex: number = 0;

// Create a new mnemonic.
const secretProvider = new SecretProvider();

// Or use an existing mnemonic.
const secretProvider = new SecretProvider(mnemonic);

const secretKey = secretProvider.deriveValidator(validatorIndex).secretKey;
const validator = new Validator(secretKey, validatorIndex, Chains.mainnet);

// Signs data for generating a  deposit data object.
const depositDataSignature: IDepositDataSignature = await validator.signDepositData(
	withdrawal_credential,
);

// Generates a deposit data object.
const depositData: IDepositData[] = generateDepositData([depositDataSignature]);

// `packed` version of `generateDepositData`.
const packedDepositData: IPackedDepositData = generatePackedDepositData([depositDataSignature]);

```

* __Generate EIP 2335 keystores for a list of validator indices:__  
Generating 100 keystores takes about 90 seconds. May vary depending on your machine.

```typescript
import { SecretProvider } from '@decentstake/beaconchain-utils';
import type { IKeystore, IKeystoreObject } from '@decentstake/beaconchain-utils/interfaces';

const password: string = "somePassword";
const mnemonic: string = 'sister protect...';
const startIndex = 0;
const numberOfValidators = 100; //ValidatorIndexes 0-99

// Create a new mnemonic.
const secretProvider = new SecretProvider();

// Or use an existing mnemonic.
const secretProvider = new SecretProvider(mnemonic);

const keystoreObject: IKeystoreObject = await secretProvider.generateKeystores(
	startIndex,
	numberOfValidators,
	password
);

const keystores: Array<IKeystore> = keystoreObject.keystores;
const psw: string = keystoreObject.password;

//OR export keystore from a single validator
//...
const validator = new Validator(secretKey, validatorIndex, Chains.mainnet);
const keystore: IKeystore = await validator.generateKeystore(password);

```

* __Derive a validator public and secret key from a BIP39 mnemonic:__

```typescript
import { SecretProvider, hexStringToBytes } from '@decentstake/beaconchain-utils';
import type { IValidatorKeyPair } from '@decentstake/beaconchain-utils/interfaces';

const mnemonic: string = 'sister protect...';
const startIndex = 0;
const numberOfValidators = 100; //ValidatorIndexes 0-99

// Create a new mnemonic.
const secretProvider = new SecretProvider();

// Or use an existing mnemonic.
const secretProvider = new SecretProvider(mnemonic);

//Derive a single validator.
const validator0KeyPair: IValidatorKeyPair = secretProvider.deriveValidator(0);
const validator0secretKey = validator0KeyPair.secretKey;
const validator0pubkey = validator0KeyPair.pubkey;

// OR Derive multiple validators.
// The nth validator has a secretKey secretKey[n] and a public key pubkey[n]
// Values are returned as hexstrings.
const { pubkeys, secretKeys } = secretProvider.exportValidators(startIndex, numberOfValidators);
const validator0secretKey = hexStringToBytes(secretKeys[0]);
const validator0pubkey = hexStringToBytes(pubkeys[0]);

```
