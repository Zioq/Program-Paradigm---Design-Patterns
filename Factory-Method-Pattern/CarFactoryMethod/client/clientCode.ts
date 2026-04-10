import { CarFactory } from "../factories/CarFactory";

export function clientCode(factory: CarFactory) {
  console.log(factory.produceCar());
}