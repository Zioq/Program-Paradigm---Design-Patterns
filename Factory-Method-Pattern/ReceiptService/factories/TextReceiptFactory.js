import { ReceiptFactory } from "./ReceiptFactory.js";
import { TextReceipt } from "../products/TextReceipt.js";

export class TextReceiptFactory extends ReceiptFactory {
	createReceipt() {
		return new TextReceipt();
	}
}
