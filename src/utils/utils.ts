/**
 * Utility function to convert a start index and a range to an array of numbers.
 * @param start The start index.
 * @param n The range. Will generate an array of numbers from start to start + n.
 * @returns The generated array of numbers.
 * @example
 * arrayFromRange(0, 5) // [0, 1, 2, 3, 4]
 * arrayFromRange(5, 5) // [5, 6, 7, 8, 9]
 * arrayFromRange(0, 1) // [0]
 * arrayFromRange(0, 0) // []
 */
export const arrayFromRange = (start: number, n: number): number[] =>
	Array.from({ length: n }, (_, index) => start + index);

// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
export const importDynamic = new Function('modulePath', 'return import(modulePath)');
