import { Notification } from "./Notification.js";

export class SMSNotification extends Notification {
    send(message) {
        console.log(`📱 Sending SMS notification: ${message}`);
    }
}