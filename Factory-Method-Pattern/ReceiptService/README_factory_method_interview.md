# Factory Method Pattern — Receipt Generator Interview Exercise

This repository demonstrates the **Factory Method Pattern** in JavaScript using a receipt generation example.

## Problem Summary

A payment system needs to generate receipts in different formats:

- PDF
- HTML
- Text

The system should:

- keep the overall receipt-generation flow consistent
- allow new receipt types to be added easily
- avoid `if/else` or `switch` chains in the main business logic

## Why Factory Method?

The key design goal is to separate:

- **what the system does** → generate a receipt
- **which concrete receipt object gets created** → PDF, HTML, or Text

The parent factory defines the workflow, and child factories decide which concrete product to create.

## Pattern Structure

### Product
`Receipt`

Defines the common interface for all receipts.

### Concrete Products
- `PDFReceipt`
- `HTMLReceipt`
- `TextReceipt`

Each receipt knows how to render itself.

### Creator
`ReceiptFactory`

Defines:

- the factory method: `createReceipt()`
- the template method: `generateReceipt(payment)`

### Concrete Creators
- `PDFReceiptFactory`
- `HTMLReceiptFactory`
- `TextReceiptFactory`

Each concrete creator decides which concrete receipt to instantiate.

## Final Code

```js
class Receipt {
    render(content) {
        throw new Error('Method "render()" must be implemented.');
    }
}

class PDFReceipt extends Receipt {
    render(content) {
        console.log(`📄 Rendering PDF Receipt: ${content}`);
    }
}

class HTMLReceipt extends Receipt {
    render(content) {
        console.log(`🌐 Rendering HTML Receipt: ${content}`);
    }
}

class TextReceipt extends Receipt {
    render(content) {
        console.log(`📝 Rendering TEXT Receipt: ${content}`);
    }
}

class ReceiptFactory {
    createReceipt() {
        throw new Error('ReceiptFactory subclasses must implement createReceipt()');
    }

    generateReceipt(payment) {
        const receipt = this.createReceipt();
        const content = `Hello ${payment.customerName}, your order #${payment.paymentId} has been confirmed.`;
        receipt.render(content);
    }
}

class PDFReceiptFactory extends ReceiptFactory {
    createReceipt() {
        return new PDFReceipt();
    }
}

class HTMLReceiptFactory extends ReceiptFactory {
    createReceipt() {
        return new HTMLReceipt();
    }
}

class TextReceiptFactory extends ReceiptFactory {
    createReceipt() {
        return new TextReceipt();
    }
}

const payment1 = {
    paymentId: 'A100',
    customerName: 'Han',
    amount: 49.99,
};

const payment2 = {
    paymentId: 'A101',
    customerName: 'Lee',
    amount: 59.99,
};

const payment3 = {
    paymentId: 'A102',
    customerName: 'Kim',
    amount: 39.99,
};

new PDFReceiptFactory().generateReceipt(payment1);
new HTMLReceiptFactory().generateReceipt(payment2);
new TextReceiptFactory().generateReceipt(payment3);
```

## Execution Flow

### 1. Choose a concrete factory
```js
const factory = new PDFReceiptFactory();
```

### 2. Call the parent workflow
```js
factory.generateReceipt(payment1);
```

### 3. Inside `generateReceipt(payment)`
- call `createReceipt()`
- build receipt content
- call `receipt.render(content)`

### 4. Child factory decides the concrete product
```js
createReceipt() {
    return new PDFReceipt();
}
```

## Why This Is Better Than `if/else`

Without Factory Method:

```js
if (format === 'pdf') {
  ...
} else if (format === 'html') {
  ...
} else if (format === 'text') {
  ...
}
```

Problems:

- business logic becomes tightly coupled to concrete classes
- every new type requires modifying existing logic
- violates the Open/Closed Principle

With Factory Method:

- the parent workflow stays unchanged
- new formats are added by creating a new product and a new factory
- creation and usage are clearly separated

## Key Takeaways

- The **Product** defines the common interface.
- The **Concrete Product** implements behavior.
- The **Creator** defines the workflow and the factory method.
- The **Concrete Creator** decides which product to instantiate.
- The parent class uses the product without knowing its concrete type.

## Interview-Level Summary

> Factory Method is a creational design pattern where a parent class defines a method for creating an object, but subclasses decide which concrete object to instantiate. The parent keeps the business workflow consistent, while object creation is delegated to child classes.

## Possible Extension

To support XML receipts later, only add:

- `XMLReceipt`
- `XMLReceiptFactory`

No changes are required in `ReceiptFactory.generateReceipt()`.

That is the main design benefit of the pattern.
