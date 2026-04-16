/* 
 * Common type 
	This layer defines the contract (or interface) that all payment system implementations must adhere to.
*/

export type Currency = 'USD' | 'CAD' | 'KRW'

export type PaymentRequest = {
	orderId: string, 
	customerId: string,
	amount: number;
	currency: Currency
}

export type PaymentResult = {
	success: boolean,
	translactionId?: string,
	provider: string,
	message: string
}

export type RefundRequest = {
	transactionId: string,
	amount: number,
	reason: string
}

export type RefundResult = {
	success: boolean,
	refundId?: string,
	provider: string,
	message: string
}

export type Receipt = {
	orderId: string,
	provider: string,
	amount: number,
	currency: Currency;
	issuedAt: string;
	summary: string;
}

export type PaymentProcessor = {
	processPayment: (request: PaymentRequest) => Promise<PaymentResult>
}

export type RefundProcessor = {
	refundPayment: (request: RefundRequest) => Promise<RefundResult>
}

export type ReceiptGenerator = {
	generateReceipt: (
		request : PaymentRequest,
		paymentResult: PaymentResult
	) => Receipt
}

export type PaymentGatewayFactory = {
	createPaymentProcess: () => PaymentProcessor,
	createRefundProcess: () => RefundProcessor
	createReceiptGenerator:() => ReceiptGenerator
}