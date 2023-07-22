/**
 * Utility function to append two Uint8Arrays.
 * @param array1 The first Uint8Array.
 * @param array2 The second Uint8Array.
 * @returns The concatenated Uint8Array.
 */
export const appendUint8Arrays = (array1: Uint8Array, array2: Uint8Array) => {
	const tmp = new Uint8Array(array1.length + array2.length);
	tmp.set(array1, 0);
	tmp.set(array2, array1.length);

	return tmp;
};

// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
export const importDynamic = new Function('modulePath', 'return import(modulePath)');
