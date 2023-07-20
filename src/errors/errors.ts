export class Eth2ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Eth2ValidationError';
	}
}
