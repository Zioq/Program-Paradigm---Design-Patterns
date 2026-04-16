/* 
 * Abstract Factory contract
 * PayPal / Stripe / KakaoPay concrete factories
 * Related service creator contains
*/

import {PaymentProcessor, RefundProcessor, ReceiptGenerator, PaymentGatewayFactory} from './types'

/* 
 PayPal
*/

const createPayPalPaymentProcess = () : PaymentProcessor => ({
	async processPayment(request) {
		console.log('[PayPal] Processing payment....', request)
		return {
			success: true,
			translactionId: `paypal_txn_${Date.now()}`,
			provider: 'PayPal',
			message: 'Payment approved by PayPal'
		}
	}
})

const createPayPalRefundProcessor = (): RefundProcessor => ({
  	async refundPayment(request) {
		console.log('[PayPal] Refunding payment...', request);
		return {
			success: true,
			refundId: `paypal_refund_${Date.now()}`,
			provider: 'PayPal',
			message: 'Refund completed by PayPal',
		};
  	},
});

const createPayPalReceiptGenerator = (): ReceiptGenerator => ({
	generateReceipt(request, paymentResult) {
		return {
			orderId: request.orderId,
			provider: 'PayPal',
			amount: request.amount,
			currency: request.currency,
			issuedAt: new Date().toISOString(),
			summary: `PayPal receipt for transaction ${paymentResult.translactionId}`
		}
	}
})

// PayPal Factory
export const createPayPalFactory = (): PaymentGatewayFactory => ({
	createPaymentProcess: createPayPalPaymentProcess,
	createRefundProcess: createPayPalRefundProcessor,
	createReceiptGenerator: createPayPalReceiptGenerator
})