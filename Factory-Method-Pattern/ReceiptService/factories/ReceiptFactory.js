export class ReceiptFactory {
	// Condition 1: Add a Factory Method (Never implemented in the parent class, but must be implemented in the child class)
	createReceipt() {
		throw new Error('ReceiptFactory subclasses must implement createReceipt()');
	}

	// Condition 2: 🔥 Template Method - generateReceipt()
	generateReceipt(payment) {
		// Step 1: Generate a Receipt object through the Factory Method
		const receipt = this.createReceipt();

		// Step 2: Create content to be rendered based on payment data
		const content = `Hello ${payment.customerName}, your order #${payment.paymentId} has been confirmed.`;

		// Step 3: Call render(content) on the created Receipt object
		return receipt.render(content);
	}
}