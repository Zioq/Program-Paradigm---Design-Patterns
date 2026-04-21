export type CheckoutType = "physical" | "digital"

export type CheckoutItem = {
	sku: string
	quantity: number;
	unitPrice: number
}

export type Metadata = Record<string, string>

export type BaseCheckoutPayload = {
	customerId: string;
	items: CheckoutItem[];
	currency: string;
	discountAmount: number;
	taxAmount: number;
	metadata: Metadata;
	giftMessage?: string;
	subtotalAmount: number;
	totalAmount: number;
}

export type PhysicalCheckoutPayload = BaseCheckoutPayload & {
	type: "physical";
	shippingAddress: string;
	billingAddress: string;
};

export type DigitalCheckoutPayload = BaseCheckoutPayload & {
  	type: "digital";
};
export type CheckoutPayload = PhysicalCheckoutPayload | DigitalCheckoutPayload
