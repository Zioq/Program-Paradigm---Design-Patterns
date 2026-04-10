export class NotificationFactory {
    createNotification() {
        throw new Error('Method "createNotification()" must be implemented.');
    }

    // Template method
    notify(message) {
        const notification = this.createNotification();
        notification.send(message);
    }
}