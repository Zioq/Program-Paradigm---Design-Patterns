import {DigitalCheckoutPayload} from '../types'
import {CheckoutPayloadBuilderBase} from './CheckoutPayloadBuilderBase'

export class DigitalCheckoutPayloadBuilder extends CheckoutPayloadBuilderBase {
  	build(): DigitalCheckoutPayload {
		const base = this.buildBasePayloadFields();

		return {
			type: "digital",
			...base,
		};
	}
}