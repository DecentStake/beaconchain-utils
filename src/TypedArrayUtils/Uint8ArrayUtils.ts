/**
 * Utility function to append two Uint8Arrays.
 * @param array1 The first Uint8Array.
 * @param array2 The second Uint8Array.
 * @returns The concatenated Uint8Array.
 */
export const appendUint8Arrays = (array1: Uint8Array, array2: Uint8Array): Uint8Array => {
	const tmp = new Uint8Array(array1.length + array2.length);
	tmp.set(array1, 0);
	tmp.set(array2, array1.length);

	return tmp;
};

//Code refactored from @chainsafe/ssz package

const hexByByte = Array.from({ length: 256 });

/**
 * Converts a Hex string to a Uint8Array.
 * @param hexString The hex string to convert.
 * @returns the hex string as a Uint8Array.
 */
export const hexStringToBytes = (hexString: string): Uint8Array => {
	if (typeof hexString !== 'string') {
		throw new TypeError(`hex argument type ${typeof hexString} must be of type string`);
	}

	if (hexString.startsWith('0x')) {
		hexString = hexString.slice(2);
	}

	if (hexString.length % 2 !== 0) {
		throw new Error(`hex string length ${hexString.length} must be multiple of 2`);
	}

	const byteLen = hexString.length / 2;
	const bytes = new Uint8Array(byteLen);

	for (let i = 0; i < byteLen; i++) {
		const byte = Number.parseInt(hexString.slice(i * 2, (i + 1) * 2), 16);
		bytes[i] = byte;
	}

	return bytes;
};

/**
 * Converts a Uint8Array to a hex string.
 * @param bytes The Uint8Array to convert to a hex string.
 * @returns The Uint8Array as a hex string.
 */
export const hexStringFromBytes = (bytes: Uint8Array): string => {
	let hex = '0x';

	for (const byte of bytes) {
		if (!hexByByte[byte]) {
			hexByByte[byte] = byte < 16 ? '0' + byte.toString(16) : byte.toString(16);
		}

		hex += hexByByte[byte];
	}

	return hex;
};
