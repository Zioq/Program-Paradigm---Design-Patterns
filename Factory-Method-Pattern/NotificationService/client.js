import dotenv from 'dotenv';
dotenv.config();
import { EmailFactory } from "./factories/EmailFactory.js";
import { SlackFactory } from "./factories/SlackFactory.js";
import { SMSFactory } from "./factories/SMSFactory.js";


function getFactory(type) {
    switch (type) {
        case 'email':
            return new EmailFactory();
        case 'slack':
            return new SlackFactory();
        case 'sms':
            return new SMSFactory();
        default:
            throw new Error('Unknown notification type');
    }
}


const NOTIFICATION_TYPE = process.env.NOTIFICATION_TYPE || 'email';
const factory = getFactory(NOTIFICATION_TYPE);
const notification = factory.createNotification();
notification.send('Hello, this is a notification!');