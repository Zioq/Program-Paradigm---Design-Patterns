import { clientCode } from "./client/clientCode";
import { SUVFactory } from "./factories/SUVFactory";
import { SedanFactory } from "./factories/SedanFactory";
import { ElectricCarFactory } from "./factories/ElectricCarFactory";



console.log("SUV Factory:");
clientCode(new SUVFactory());

// Sedan
console.log("\n	Sedan Factory:");
clientCode(new SedanFactory());

// Electric Car
console.log("\nElectric Car Factory:");
clientCode(new ElectricCarFactory());