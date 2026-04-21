import type { CheckoutItem } from './types';

export class CheckoutPayload {
	constructor(
		public readonly customerId: string,
		public readonly items: CheckoutItem[],
		public readonly shippingAddress: string | undefined,
		public readonly billingAddress: string | undefined,
		public readonly currency: string,
		public readonly discountAmount: number,
		public readonly taxAmount: number,
		public readonly metadata: Record<string, string>,
		public readonly giftMessage: string | undefined,
    	public readonly totalAmount: number
	){}
}


