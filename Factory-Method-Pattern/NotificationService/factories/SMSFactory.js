import { NotificationFactory } from "./NotificationFactory.js";
import { SMSNotification } from "../notifications/SMSNotification.js";

export class SMSFactory extends NotificationFactory {
    createNotification() {
        return new SMSNotification();
    }
}