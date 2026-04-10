import { Car } from "../interfaces/Car";
import { CarFactory } from "./CarFactory";
import { ElectricCar } from "../products/ElectricCar";

export class ElectricCarFactory extends CarFactory {
  public createCar(): Car {
    return new ElectricCar();
  }
}