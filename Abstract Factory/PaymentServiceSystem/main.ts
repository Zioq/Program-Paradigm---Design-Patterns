/* 
 * Composition root
*/

import { createCheckoutService } from "./payment/checkout";
import {
	createPayPalFactory,
} from './payment/factories'
import { PaymentGatewayFactory } from './payment/types';

async function run() {
	const request = {
		orderId: 'order_1001',
		customerId: 'customer_abc',
		amount: 129.99,
		currency: 'USD' as const,
	}
	const selectedProvider = 'paypal';
	let factory: PaymentGatewayFactory;

	switch(selectedProvider) {
		case 'paypal':
			factory = createPayPalFactory();
			break;
		default:
			throw new Error('Unsupported payment provider');
	}
	const checkoutService = createCheckoutService(factory);
	const { payment, receipt } = await checkoutService.checkout(request);
	console.log('Payment Result:', payment);
  	console.log('Receipt:', receipt);
}
