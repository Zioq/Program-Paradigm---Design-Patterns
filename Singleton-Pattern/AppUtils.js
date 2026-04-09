/* 
    module pattern with singleton initialization

    This implementation has characteristics of both the Module Pattern and Singleton Pattern.
    It uses an IIFE and closures to encapsulate private members, which is typical of the Module Pattern.
    At the same time, it lazily creates and returns only one shared instance through getInstance(), which gives it singleton behavior.
    In practice, I’d describe it as a singleton-style module rather than a pure stateful singleton.
*/

const AppUtils = (function() {
    let instance

    function init() {

        /* 
        Private data is truly hidden
        -> Good encapsulation.
        */

        // Private
        const version = '1.0.0'
        // Private methods
        function _formatDate(date) {
            return new Date(date).toISOString().split('T')[0]
        }

        // public API
        return {
            //String utils
            string: {
                capitalize: function(str) {
                    if (typeof str !== 'string' || str.length === 0) return '';
                    return str.charAt(0).toUpperCase() + str.slice(1)
                },
                truncate: function(str, length) {
                    if (typeof str !== 'string') return '';
                    if (typeof length !== 'number' || length < 0) return str;
                    return str.length > length ? str.substring(0, length) + '...' : str;
                }
            },

            // Date utils
            date: {
                getCurrentDate: function() {
                    return _formatDate(new Date())
                },
                formatDate: _formatDate
            },

            // Number utils
            number: {
                formatCurrency: function(num) {
                    return new Intl.NumberFormat('ko-KR', {
                        style: 'currency',
                        currency: 'KRW'
                    }).format(num)
                },

                random: function(min, max) {
                    if (!Number.isInteger(min) || !Number.isInteger(max)) {
                        throw new Error('min and max must be integers');
                    }
                    if (min > max) {
                        throw new Error('min cannot be greater than max');
                    }
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
            },

            //System info
            getVersion: function() {
                return version
            }

        }
    }

    return {
        getInstance: function() {
            if(!instance) { // Lazy initialization
                instance = init()
            }

            return instance
        }
    }

})()

// Usage
const utils = AppUtils.getInstance()
console.log(utils.string.capitalize('hello world'))
console.log(utils.date.getCurrentDate())
console.log(utils.number.formatCurrency(1234567))
console.log(utils.getVersion())
