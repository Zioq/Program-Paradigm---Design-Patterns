class HoneyPot {
	static instance = null
	amount = 1000; // 1000ml

	constructor() {
		if(HoneyPot.instance) {
			throw new Error("Use HoneyPot.getInstance()")
		}
	} // Not allowed new from outside

	static getInstance() {
		if(!HoneyPot.instance) {
			HoneyPot.instance = new HoneyPot();
		}

		return HoneyPot.instance
	}
	getHoney(ml) {
		this.amount -= ml;
		console.log(`Get ${ml}ml money. ${this.amount}ml remaind`)
	}

	getRemainHoney(){
		return this.amount
	}
}

let pot1 = HoneyPot.getInstance()
let pot2 = HoneyPot.getInstance()
// const pot = new HoneyPot(); // Show throw the error
console.log(pot1 === pot2) // Should be true
pot1.getHoney(200)
console.log(pot1.getRemainHoney() === pot2.getRemainHoney())  // Should be true
pot2.getHoney(200)

