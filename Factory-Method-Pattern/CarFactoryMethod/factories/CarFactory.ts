import { Car } from "../interfaces/Car";

// Create a abstract factory class (Car Factory)
export abstract class CarFactory {
	public abstract createCar(): Car;

	public produceCar(): string {
		const car = this.createCar();
		return `
			🏭 Produce start.
			${car.assemble()}
			${car.deliver()}
			🚗 Produce end: ${car.name}.
		`
	}
}