import { ReceiptFactory } from "./ReceiptFactory.js";
import { PDFReceipt } from "../products/PDFReceipt.js";

export class PDFReceiptFactory extends ReceiptFactory{
	createReceipt() {
		return new PDFReceipt();
	}
}