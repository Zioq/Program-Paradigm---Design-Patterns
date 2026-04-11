import { Receipt } from "./Receipt.js";


export class HTMLReceipt extends Receipt{
	// render override
	render(content){
		console.log(`🌐 Rendering HTML Receipt: ${content}`);
	}
}