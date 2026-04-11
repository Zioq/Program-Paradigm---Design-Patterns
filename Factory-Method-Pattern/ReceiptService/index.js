import { PDFReceiptFactory } from "./factories/PDFReceiptFactory.js";
import { HTMLReceiptFactory } from "./factories/HTMLReceiptFactory.js";
import { TextReceiptFactory } from "./factories/TextReceiptFactory.js";
import { payments } from "./src/data/payments.js";

const pdfFactory = new PDFReceiptFactory();
const htmlFactory = new HTMLReceiptFactory();
const textFactory = new TextReceiptFactory();

pdfFactory.generateReceipt(payments[0]);
htmlFactory.generateReceipt(payments[1]);
textFactory.generateReceipt(payments[2]);