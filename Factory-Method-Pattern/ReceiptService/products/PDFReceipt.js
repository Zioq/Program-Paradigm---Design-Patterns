import { Receipt } from "./Receipt.js";

export class PDFReceipt extends Receipt{
	// render override
	render(content){
		console.log(`📄 Rendering PDF Receipt: ${content}`);
	}
}