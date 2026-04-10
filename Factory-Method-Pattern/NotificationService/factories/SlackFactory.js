import { NotificationFactory } from "./NotificationFactory.js";
import { SlackNotification } from "../notifications/SlackNotification.js";


export class SlackFactory extends NotificationFactory {
    createNotification() {
        return new SlackNotification();
    }
}