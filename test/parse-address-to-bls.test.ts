import { hexStringFromBytes, parseAddressToBLS } from '../src';

describe('ParseAddressToBLS', () => {
	it('should parse address to BLS', () => {
		const address = '0x8FB40436758Ea9e1a8317f54293Af74be02faFf0';
		const bls = hexStringFromBytes(parseAddressToBLS(address));
		expect(bls).toEqual('0x0100000000000000000000008fb40436758ea9e1a8317f54293af74be02faff0');
	});
	it('should throw if address is not checksummed', () => {
		const address = '0x8FB40436758Ea9e1a8317f54293Af74be02faf0';
		expect(() => parseAddressToBLS(address)).toThrow('Address is not checksummed');
	});
});
