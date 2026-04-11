/* 
	- Product의 추상 개념: Receipt
	- Concreate Product: `PDFReceipt`, `HTMLReceipt`, `TextReceipt`
	
	Step 1: Product 정의
	이 문제의 Product는 무엇인가?
		- Receipt
	Concrete Product는 무엇들인가?
		- PDFReceipt, HTMLReceipt, TextReceipt
	각 Product가 최소한 가져야 하는 공통 메서드는 무엇인가?
		- render()
		: 각 Receipt는 render() 메서드를 구현해야 합니다. 이 메서드는 Receipt의 내용을 특정 형식으로 렌더링하는 역할을 합니다.

	Step 2: Creator 구조 설계
	Receipt를 생성하는 부모 클래스 이름
		- ReceiptFactory
	Factory Method 이름
		- createReceipt()
	Concrete Factory들 이름
		- PDFReceiptFactory, HTMLReceiptFactory, TextReceiptFactory  


	Step 3: Concrete Factory 구현
	부모 Creator(ReceiptFactory)의 공통 메서드 이름을 뭘로 할래?
		- generateReceipt()
	그 메서드 안에서 일어나는 일을 3단계 또는 4단계로 써봐
		1. Factory Method를 통해 Receipt 객체를 생성한다
		2. payment 데이터를 기반으로 출력할 content를 생성한다
		3. 생성된 Receipt 객체의 render(content)를 호출한다
	그 단계들 중 자식에게 위임되는 딱 한 단계는 뭐야?
		createReceipt() 메서드에서 Receipt 객체를 생성하는 단계가 자식에게 위임되는 단계입니다. 각 Concrete Factory는 이 메서드를 구현하여 자신이 생성할 Receipt 객체의 구체적인 타입을 결정합니다.


	각 Concrete Factory는 createReceipt() 메서드를 구현하여 해당 형식의 Receipt 객체를 생성합니다.
		- PDFReceiptFactory: createReceipt() -> PDFReceipt 객체 반환
		- HTMLReceiptFactory: createReceipt() -> HTMLReceipt 객체 반환
		- TextReceiptFactory: createReceipt() -> TextReceipt 객체 반환
*/


/* Step 4-1: Product Definition */
class Receipt{
	render(content){ // Never implemented in the parent class, but must be implemented in the child class
		throw new Error('Receipt subclasses must implement render()');
	}
}

/* Step 4-2: Concrete Product Definition */
class PDFReceipt extends Receipt{
	// render override
	render(content){
		console.log(`📄 Rendering PDF Receipt: ${content}`);
	}
}

class HTMLReceipt extends Receipt{
	// render override
	render(content){
		console.log(`🌐 Rendering HTML Receipt: ${content}`);
	}
}

class TextReceipt extends Receipt{
	// render override
	render(content){
		console.log(`📝 Rendering TEXT Receipt: ${content}`);
	}
}

/* Step 4-3: Implement abstract Creator (Factory) class: Create a `ReceiptFactory` as an Parent Creator class */
class ReceiptFactory {
	// Condition 1: Add a Factory Method (Never implemented in the parent class, but must be implemented in the child class)
	createReceipt() {
		throw new Error('ReceiptFactory subclasses must implement createReceipt()');
	}

	// Condition 2: 🔥 Template Method - generateReceipt()
	generateReceipt(payment) {
		// Step 1: Generate a Receipt object through the Factory Method
		const receipt = this.createReceipt();

		// Step 2: Create content to be rendered based on payment data
		const content = `Hello ${payment.customerName}, your order #${payment.paymentId} has been confirmed.`;

		// Step 3: Call render(content) on the created Receipt object
		return receipt.render(content);
	}
}

/* Step 4-4: Concrete Factory Implementation + Implementation Test */
class PDFReceiptFactory extends ReceiptFactory{
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
  paymentId: "A100",
  customerName: "Han",
  amount: 49.99
}

const payment2 = {
  paymentId: "A101",
  customerName: "Lee",
  amount: 59.99
}

const payment3 = {
  paymentId: "A102",
  customerName: "Kim",
  amount: 39.99
}

const pdfFactory = new PDFReceiptFactory();
pdfFactory.generateReceipt(payment1);

const htmlFactory = new HTMLReceiptFactory();
htmlFactory.generateReceipt(payment2);

const textFactory = new TextReceiptFactory();
textFactory.generateReceipt(payment3);




