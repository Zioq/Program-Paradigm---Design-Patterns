import { NotificationFactory } from "./NotificationFactory.js";
import { EmailNotification } from "../notifications/EmailNotification.js";

export class EmailFactory extends NotificationFactory {
    createNotification() {
        return new EmailNotification();
    }
}