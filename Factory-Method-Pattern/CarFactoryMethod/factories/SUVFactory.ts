import { Car } from "../interfaces/Car";
import { CarFactory } from "./CarFactory";
import { SUV } from "../products/SUV";

export class SUVFactory extends CarFactory {
	public createCar(): Car {
		return new SUV();
	}
}