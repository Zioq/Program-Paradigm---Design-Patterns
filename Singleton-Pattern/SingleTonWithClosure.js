/* 
Best Practice singleton code sample  you should remember
IIFE + Closure way
IIFE = Immediately Invoked Function Expression
Runs immediately after definition
	Used for:
	- private scope
	- avoiding global pollution
	- singleton/module patterns
*/

const singleton = (function () {
	let instance; // private instance 

	function createInstance() {
		// const object = { 
		//     randomNumber : Math.random(), // If we use this way, randomNumber can be polluted from outside access
		//     getRandom: function() { 
		//         return this.randomNumber 
		//     } 
		// } 
		// return object

		const randomNumber = Math.random() // Make not allow access from outside for this variable
		return {
			getRandom() {
				return randomNumber
			}
		}
	}

	return {
		getInstance: function() {
			if(!instance) {
				instance = createInstance() 
			}
			return instance
		}
	}
})()

// useage
const instance1 = singleton.getInstance()
const instance2 = singleton.getInstance()
console.log(instance1 === instance2) // true
console.log(instance1.getRandom() === instance2.getRandom()) //true