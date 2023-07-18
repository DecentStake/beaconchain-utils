# Eth2 BeaconChain Utils

⚠️ This package is intended for internal use ⚠️  

This package contains typescript utilities for working with the Eth2 Beacon Chain, wrapping around [@Lodestar](https://github.com/ChainSafe/lodestar) and [@Chainsafe](https://github.com/ChainSafe) packages.

## Examples

Sign and generate a DepositData object with a BIP39 mnemonic:

```typescript
import { generateDepositData, generatePackedDepositData } from '@decentstake/beaconchain-utils';
import { ValidatorSigner } from '@decentstake/beaconchain-utils/classes';
import { parseAddressToBLS } from '@decentstake/beaconchain-utils/utils';
import type {
    IDepositData,
    IDepositDataSignature,
    IPackedDepositData
} from '@decentstake/beaconchain-utils/interfaces';

const mnemonic: string = 'sister protect...'
const withdrawal_credential: Uint8Array = parseAddressToBLS('0x8FB40436758Ea9e1a8317f54293Af74be02faFf0');
const validatorIndex: number = 3291;
const validatorIndexes: Array<number> = [3291, 1];

// Create a new mnemonic.
const signer = new ValidatorSigner('mainnet');

// Or use an existing mnemonic.
const signer = new ValidatorSigner('goerli', mnemonic);

// Signs data for generating a  deposit data object.
const depositDataSignature: IDepositDataSignature = await signer.signDepositData(
    withdrawal_credential,
    validatorIndex
);

// Batched version of `signDepositData`.
const depositDataSignatures: Array<IDepositDataSignature> = await signer.signDepositDataBatch(
    withdrawal_credential,
    validatorIndexes
);


// Generates a deposit data object.
const depositData: IDepositData = generateDepositData([depositDataSignature]);
const depositData: IDepositData = generateDepositData(depositDataSignatures);

// `packed` version of `generateDepositData`.
const packedDepositData: IPackedDepositData = generatePackedDepositData([depositDataSignature]);
const packedDepositData: IPackedDepositData = generatePackedDepositData(depositDataSignatures);

```

Generates EIP 2335 keystores for a list of validator indices:

```typescript
import { SecretKeyProvider } from '@decentstake/beaconchain-utils/classes';
import type { IKeystore } from '@chainsafe/bls-keystore';
import type { IKeystoreObject } from '@decentstake/beaconchain-utils/interfaces'

const password: string = "eth1234"; 
const mnemonic: string = 'sister protect...'
const validatorIndexes: Array<number> = [3291, 1];

// Create a new mnemonic.
const secretKeyProvider = new SecretKeyProvider();

// Or use an existing mnemonic.
const secretKeyProvider = new SecretKeyProvider(mnemonic);

// Generate keystores for a list of validator indices.
const keystoreObject: IKeystoreObject = await secretKeyProvider.generateKeystores(validatorIndexes, password);
const keystores: Array<IKeystore> = keystoreObject.keystores;
const passwords: string = keystoreObject.password;

```

Derive a validator public and secret key from a BIP39 mnemonic:

```typescript
import { SecretKeyProvider } from '@decentstake/beaconchain-utils';
import type { IValidator } from '@decentstake/beaconchain-utils/interfaces'

const mnemonic: string = 'sister protect...'
const validatorIndex: number = 3291;
const validatorIndexes: Array<number> = [3291, 1];

// Create a new mnemonic.
const secretKeyProvider = new SecretKeyProvider();

// Or use an existing mnemonic.
const secretKeyProvider = new SecretKeyProvider(mnemonic);

// Derive a validator public and secret key from a BIP39 mnemonic.
const validator: IValidator = await secretKeyProvider.deriveValidator(validatorIndex);

// Batched version of `deriveValidator`.
const validators: Array<IValidator> = await secretKeyProvider.deriveValidators(validatorIndexes);

```
