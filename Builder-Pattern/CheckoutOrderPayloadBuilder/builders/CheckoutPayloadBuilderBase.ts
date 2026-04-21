import type {
	CheckoutItem,
	CheckoutPayload,
	DigitalCheckoutPayload,
	Metadata,
	PhysicalCheckoutPayload,
} from "../types";


export abstract class CheckoutPayloadBuilderBase {
	protected customerId?: string;
	protected items: CheckoutItem[] = [];
	protected currency?: string;
	protected discountAmount = 0;
	protected taxAmount = 0;
	protected metadata: Metadata = {};
	protected giftMessage?: string;

	setCustomerId(customerId: string): this {
    	this.customerId = customerId;
    	return this;
  	}

	addItem(item: CheckoutItem): this {
		if(!item.sku.trim()) {
			throw new Error("SKU is required.");
		}

		if (item.quantity <= 0) {
			throw new Error("Item quantity must be greater than 0.");
		}

		if (item.unitPrice < 0) {
			throw new Error("Item unitPrice cannot be negative.");
		}

		this.items.push(item);
		return this;
	}

	setCurrency(currency: string): this {
		if (!currency.trim()) {
      		throw new Error("Currency is required.");
    	}

		this.currency = currency;
		return this;
	}

	setDiscountAmount(amount: number): this {
		if (amount < 0) {
			throw new Error("Discount amount cannot be negative.");
		}

		this.discountAmount = amount;
		return this;
	}

	setTaxAmount(amount: number): this {
		if (amount < 0) {
			throw new Error("Tax amount cannot be negative.");
		}

		this.taxAmount = amount;
		return this;
	}

	setMetadata(metadata: Metadata): this {
		this.metadata = { ...metadata };
		return this;
	}

	setGiftMessage(message: string): this {
		if (!message.trim()) {
			throw new Error("Gift message cannot be empty.");
		}

		this.giftMessage = message;
		return this;
	}

	protected validateBase(): void {
		if (!this.customerId?.trim()) {
			throw new Error("customerId is required.");
		}

		if (this.items.length === 0) {
			throw new Error("At least one checkout item is required.");
		}

		if (!this.currency?.trim()) {
			throw new Error("currency is required.");
		}
	}

	protected calculateSubtotalAmount(): number {
		return this.items.reduce((sum, item) => {
		return sum + item.quantity * item.unitPrice;
		}, 0);
  	}

  	protected calculateTotalAmount(subtotalAmount: number): number {
		const totalAmount = subtotalAmount + this.taxAmount - this.discountAmount;

		if (totalAmount < 0) {
		throw new Error("Total amount cannot be negative.");
		}

		return totalAmount;
  	}

  	protected buildBasePayloadFields() {
		this.validateBase();

		const subtotalAmount = this.calculateSubtotalAmount();
		const totalAmount = this.calculateTotalAmount(subtotalAmount);

	return {
		customerId: this.customerId!,
		items: [...this.items],
		currency: this.currency!,
		discountAmount: this.discountAmount,
		taxAmount: this.taxAmount,
		metadata: { ...this.metadata },
		giftMessage: this.giftMessage,
		subtotalAmount,
		totalAmount,
	};
  	}

	abstract build(): CheckoutPayload;	

}

class CheckoutPayloadBuilder {
	private customerId?: string
	private items: CheckoutItem[] = []
	private shippingAddress?: string
	private billingAddress?: string
	private currency: string = "USD";
	private discountAmount : number = 0 
	private taxAmount: number = 0 
	private metadata: Record<string, string> = {}
	private giftMessage?: string


	setCustomerId(customerId: string): this {
		this.customerId = customerId;
		return this
	}

	addItem(sku: string, quantity: number, unitPrice: number) : this  {
		if (quantity < 1) {
			throw new Error("quantity must be at least 1");
		}

		if (unitPrice < 0) {
			throw new Error("unitPrice must be 0 or greater");
		}

		this.items.push({ sku, quantity, unitPrice });
		return this;
	}

	setShippingAddress(shippingAddress: string): this {
		this.shippingAddress = shippingAddress
		return this
	}

	setBillingAddress(billingAddress: string): this {
		this.billingAddress = billingAddress
		return this
	}

	setCurrency(currency: string) : this {
		this.currency = currency
		return this
	}

	setDiscountAmount(discountAmount: number): this {
		this.discountAmount = discountAmount
		return this
	}

	setTaxAmount(taxAmount: number): this {
		this.taxAmount = taxAmount
		return this
	}

	setMetadata(key: string, value: string): this {
		this.metadata[key] = value
		return this
	}

	setGiftMessage(message: string): this {
		this.giftMessage = message
		return this
	}

	build(): CheckoutPayload {
		if(!this.customerId) {
			throw new Error("customerId is required");
		}

		if (this.items.length === 0) {
			throw new Error("at least one item is required");
		}

		if (this.discountAmount < 0) {
			throw new Error("discountAmount must be 0 or greater");
		}

		if(this.taxAmount < 0) {
			throw new Error("taxAmount must be 0 or greater");
		}

		if (this.giftMessage !== undefined && this.giftMessage.trim() === "") {
			throw new Error("giftMessage cannot be empty");
		}

		const subtotal = this.items.reduce(
			( sum, item) => sum + item.quantity * item.unitPrice, 0
		);

		const totalAmount = subtotal + this.taxAmount - this.discountAmount;

		if (totalAmount < 0) {
			throw new Error("totalAmount cannot be negative");
		}

		return new CheckoutPayload(
			this.customerId,
			[...this.items],
			this.shippingAddress,
			this.billingAddress,
			this.currency,
			this.discountAmount,
			this.taxAmount,
			{... this.metadata},
			this.giftMessage,
			totalAmount
		)

	}

}