let instance = null;
class StrictSingleton {
	constructor() {
        if(instance) {
            throw new Error("Do not use `new`. Please use StrictSingleton.getInstance().")
        }
        instance = this;
        this.value = Math.random()
    }

    static getInstance() {
        if(!instance) {
            instance = new StrictSingleton()
        }
        return instance
    }
    
    printValue() {
        console.log(this.value)
    }
}

const singleton1 = StrictSingleton.getInstance()
const singleton2 = StrictSingleton.getInstance()

console.log(singleton1 === singleton2)
singleton1.printValue()
singleton2.printValue()
/* 
    This code guarantess: single instance ✅
    But, it does not guarantee: single creation entry point ❌
        - new StrictSinglton()
        - StrictSinglton.getInstance()
        ☝️ these can create the first instance

    So, we can use CONSTRUCTOR_TOKEN for full enforcement 
*/

/* 
======================================================================
*/


const CONSTRUCTOR_TOKEN = Symbol();
let most_strict_instance = null;

class MostStrictSingleton {
    constructor(token) {
        if (token !== CONSTRUCTOR_TOKEN) {
            throw new Error("Do not use `new`. Please use MostStrictSingleton.getInstance().");
        }
        this.value = Math.random();
    }

    static getInstance() {
        if (!instance) {
            instance = new MostStrictSingleton(CONSTRUCTOR_TOKEN);
        }
        return instance;
    }

    printValue() {
        console.log(this.value);
    }
}
/* 
new StrictSingleton(); // ❌
StrictSingleton.getInstance(); // ✅
Symbol -> Never can be created with same value

const a = Symbol();
const b = Symbol();

console.log(a === b); // false
Only getInstance knows CONSTRUCTOR_TOKEN value
*/
