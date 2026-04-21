import {PhysicalCheckoutPayload} from '../types'
import {CheckoutPayloadBuilderBase} from './CheckoutPayloadBuilderBase'
export class PhysicalCheckoutPayloadBuilder extends CheckoutPayloadBuilderBase {
	private shippingAddress?: string;
	private billingAddress?: string;

	setShippingAddress(address: string): this {
		if (!address.trim()) {
		throw new Error("Shipping address is required.");
	}

		this.shippingAddress = address;
		return this;
	}

	setBillingAddress(address: string): this {
		if (!address.trim()) {
		throw new Error("Billing address is required.");
	}

		this.billingAddress = address;
		return this;
	}

	build(): PhysicalCheckoutPayload {
		const base = this.buildBasePayloadFields();

		if (!this.shippingAddress?.trim()) {
			throw new Error(
			"shippingAddress is required for physical checkout."
		);
	}

	if (!this.billingAddress?.trim()) {
		throw new Error(
			"billingAddress is required for physical checkout."
		);
	}

	return {
		type: "physical",
		...base,
		shippingAddress: this.shippingAddress,
		billingAddress: this.billingAddress,
		};
	}
}