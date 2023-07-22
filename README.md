# Eth2 BeaconChain Utils

⚠️ This package is intended for internal use ⚠️  

This package contains typescript utilities for working with the Eth2 Beacon Chain, wrapping around [@Lodestar](https://github.com/ChainSafe/lodestar) and [@Chainsafe](https://github.com/ChainSafe) packages.

## Examples

Sign and generate a DepositData object with a BIP39 mnemonic:

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
const withdrawal_credential: Uint8Array = parseAddressToBLS('0x8FB40436758Ea9e1a8317f54293Af74be02faFf0');
const validatorIndex: number = 0;
let secretKey;

// Create a new mnemonic.
const secretProvider = new SecretProvider();

// Or use an existing mnemonic.
const secretProvider = new SecretProvider(mnemonic);

await secretProvider.exportSecretKey((sk: Uint8Array) => {
	secretKey = sk;
});
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

Generates EIP 2335 keystores for a list of validator indices:  
Generating 100 keystores takes about 90 seconds. May vary depending on your machine.

```typescript
import { SecretProvider } from '@decentstake/beaconchain-utils';
import type { IKeystore } from '@chainsafe/bls-keystore';
import type { IKeystoreObject } from '@decentstake/beaconchain-utils/interfaces';

const password: string = "eth1234";
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

Derive a validator public and secret key from a BIP39 mnemonic:

```typescript
import { SecretProvider } from '@decentstake/beaconchain-utils';
import type { IValidatorKeyPair } from '@decentstake/beaconchain-utils/interfaces';
import { fromHexString } from '@chainsafe/ssz';

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
const validator0secretKey = fromHexString(secretKeys[0]);
const validator0pubkey = fromHexString(pubkeys[0]);

```
