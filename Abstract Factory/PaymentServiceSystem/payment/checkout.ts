/* 
*   Application user case
    Application layer: We implement the business workflow here, not the provider-specific logic.

    This is where we implement the application-level use cases. It coordinates the payment flow by consuming the factory interface, ensuring that the business logic remains decoupled from concrete payment provider implementations.
    
    This is where we implement the core application logic (use case), such as processing payments and handling refunds, using the abstract factory without knowing the specific payment provider.
*/

import {
    PaymentGatewayFactory,
    PaymentRequest,
    PaymentResult,
    Receipt,
    RefundRequest,
    RefundResult

} from './types'

export const createCheckoutService = (factory: PaymentGatewayFactory) => {
    const paymentProcess = factory.createPaymentProcess();
    const refundProcess = factory.createRefundProcess();
    const receiptGenerator = factory.createReceiptGenerator();

    return {
        async checkout(
            request: PaymentRequest
        ): Promise<{ payment: PaymentResult; receipt: Receipt }>{
            const payment = await paymentProcess.processPayment(request)

            if(!payment.success) {
                throw new Error(payment.message)
            }

            const receipt = receiptGenerator.generateReceipt(request, payment)

            return {payment, receipt}
        },

        async refund(
            transactionId: string, 
            amount: number
        ): Promise<RefundResult>{
            return refundProcess.refundPayment({
                transactionId,
                amount,
                reason: 'Customer requested refund',
            })
        }
    }
}