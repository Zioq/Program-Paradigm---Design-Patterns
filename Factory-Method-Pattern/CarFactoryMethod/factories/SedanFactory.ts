import { Car } from "../interfaces/Car";
import { CarFactory } from "./CarFactory";
import { Sedan } from "../products/Sedan";

export class SedanFactory extends CarFactory {
	public createCar(): Car {
		return new Sedan();
	}
}