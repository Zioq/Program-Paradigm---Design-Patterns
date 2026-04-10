import { Notification } from "./Notification.js";

export class SlackNotification extends Notification {
    send(message) {
        console.log(`📣 Sending Slack notification: ${message}`);
    }
}
