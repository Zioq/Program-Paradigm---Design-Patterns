## 1. Scenario
- Our system needs to send notifications
- There are multiple channels (Slack, Email, SMS)
- The client only needs to decide which channel to use
- The client does not need to know the implementation details

## 2. Why This Fits the Factory Method Pattern
This is a perfect use case for the Factory Method pattern, as it allows the system to delegate object creation to subclasses while keeping the client decoupled from the concrete implementations.

![alt text](<Factory method pattern explained visually.png>)

![alt text](<Notification service class diagram.png>)