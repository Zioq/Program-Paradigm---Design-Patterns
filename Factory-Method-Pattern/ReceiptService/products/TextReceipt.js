import { Receipt } from "./Receipt.js";

export class TextReceipt extends Receipt{
	// render override
	render(content){
		console.log(`📝 Rendering TEXT Receipt: ${content}`);
	}
}
