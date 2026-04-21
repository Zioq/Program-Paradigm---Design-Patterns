import {DigitalCheckoutPayloadBuilder} from "./builders/DigitalCheckoutPayloadBuilder";
import {PhysicalCheckoutPayloadBuilder} from "./builders/PhysicalCheckoutPayloadBuilder"

const physicalPayload = new PhysicalCheckoutPayloadBuilder()
  .setCustomerId("cust-physical-001")
  .addItem({
	sku: "sku-001",
	quantity: 2,
	unitPrice: 120,
  })
  .setCurrency("CAD")
  .setTaxAmount(24)
  .setDiscountAmount(10)
  .setMetadata({ source: "web", campaign: "spring-sale" })
  .setGiftMessage("Happy Birthday!")
  .setShippingAddress("123 Main St, Vancouver, BC")
  .setBillingAddress("456 Billing Ave, Vancouver, BC")
  .build();

const digitalPayload = new DigitalCheckoutPayloadBuilder()
  .setCustomerId("cust-digital-001")
  .addItem({
	sku: "ebook-001",
	quantity: 1,
	unitPrice: 30,
  })
  .setCurrency("CAD")
  .setTaxAmount(3)
  .setDiscountAmount(5)
  .setMetadata({ source: "mobile-app" })
  .build();

console.log(physicalPayload);
console.log(digitalPayload);