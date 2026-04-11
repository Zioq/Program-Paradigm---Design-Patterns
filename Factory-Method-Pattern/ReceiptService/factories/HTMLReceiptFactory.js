import { ReceiptFactory } from "./ReceiptFactory.js";
import { HTMLReceipt } from "../products/HTMLReceipt.js";

export class HTMLReceiptFactory extends ReceiptFactory {
	createReceipt() {
		return new HTMLReceipt();
	}
}