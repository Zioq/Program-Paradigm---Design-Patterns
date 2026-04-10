import { Notification } from "./Notification.js";

export class EmailNotification extends Notification {
    send(message) {
        console.log(`📧 Sending email notification: ${message}`);
    }
}