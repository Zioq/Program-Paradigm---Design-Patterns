import { Car } from "../interfaces/Car";
export class ElectricCar implements Car {
	name = 'Electric Car';

	assemble(): string {
		return '🔧 Battery pack assembly + electric motor installation.';
	}

	deliver(): string {
		return '🚛 Range and charging test pass';
	}
}