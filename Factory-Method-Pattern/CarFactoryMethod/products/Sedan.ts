import { Car } from "../interfaces/Car";
export class Sedan implements Car {
	name = 'Sedan';

	assemble(): string {
		return '🔧 Lightweight body assembly + efficient engine.';
	}

	deliver(): string {
		return '🚛 City driving test pass';
	}
}