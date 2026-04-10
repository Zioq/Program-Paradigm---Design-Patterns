import { Car } from "../interfaces/Car";

// Concrete Product A - SUV
export class SUV implements Car {
	name = 'SUV';

	assemble(): string {
		return '🔧 Heavy body assembly + 4WD system.';
	}

	deliver(): string {
		return '🚛 Off-road capability test pass';
	}
}