/* 
    The NotificationFactory class serves as the base factory for creating notifications. It defines an abstract method createNotification() that must be implemented by subclasses to create specific types of notifications (e.g., EmailNotification, SMSNotification). The notify() method is a template method that uses the created notification to send a message, demonstrating the Factory Method pattern.
*/

export class NotificationFactory {
    /* 
        Abstract method
        - It enforces the contract by ensuring that subclasses must implement the method, simulating an abstract method in JavaScript.
    
        - same concept of an abstract method in other languages (e.g abstract createNotification();)
    */
    createNotification() {
        throw new Error('Method "createNotification()" must be implemented.');
    }

    // Template method
    notify(message) {
        const notification = this.createNotification();
        notification.send(message);
    }
}