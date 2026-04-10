import { clientCode } from "./CarFactoryMethod/client/clientCode";
import { SUVFactory } from "./CarFactoryMethod/factories/SUVFactory";
import { SedanFactory } from "./CarFactoryMethod/factories/SedanFactory";
import { ElectricCarFactory } from "./CarFactoryMethod/factories/ElectricCarFactory";



console.log("SUV Factory:");
clientCode(new SUVFactory());

// Sedan
console.log("\n	Sedan Factory:");
clientCode(new SedanFactory());

// Electric Car
console.log("\nElectric Car Factory:");
clientCode(new ElectricCarFactory());