## Decorator pattern
`Decorator` is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.


### 🎯 Can you explain Decorator Pattern?
It’s a structural design pattern that allows you to add behavior to an object dynamically, without modifying its original implementation.
Instead of using inheritance, it relies on composition by wrapping the original object and delegating the call. 
>  It allows us to add behavior dynamically by wrapping objects, while keeping the core logic clean and unchanged.

### 🎯 2. Why?
Q: Why do we need to use Decorator Pattern?
A: The decorator pattern is needed when we want to extend the behavior of an object in a flexible and maintainable way, without modifying its original implementation.

In many system, we often need to add additional responsibilities to objects over time. If we rely on inheritance, we quickly run into rigid hierarchies and class explosion.

Decorator solves this by using composition instead of inheritance, allowing behaviours to be added, removed, or combined dynamically at runtime.

### 🎯 3. How it works
Q: How the decorator pattern works?
A: The key idea is that both the core object and the decorators implements the same interface. Each decorator wraps another object of that same interface and adds behavior before or after delegating the call. So from outside, a decorated object looks exactly like the original one.  
>  Same interface, wrapped object, and behavior added around delegation. 

### 🎯 4. Real-world example (🔥)
Q: Can you give us one example?

A: Imagine the HTTP client that just sends API request. In a real system, we need additional feature like:
```
Logging
Retry failed request
Adding authentication
Caching GET response
Handling timeout.
```
Instead of putting all of this into a single HTTP client, we can use decorators. So we might have something like: 
```
An Auth decorator,
wrapping a Cache decorator,
wrapping a Retry decorator,
wrapping a Logging decorator,
wrapping the bast HTTP client. 
```
→ It flows through each layer. First, the auth decorator adds a token, then the Cache decorator checks for a cached response, then the Retry decorator handles failures, then Logging decorator log the request, and finally the base client sends the actual HTTP request.

### 🎯 5. Why it's good
This gives us several advantages. 
First, it follows Open-Close Principle. Because we can add new behaviors without modifying existing code. 
Second, it improves separation of concerns, since each decorator is responsible for only one thing.
Third, it gives use flexibility, because we can compose different behaviours depending on the environment. 
And finally, it makes testing easier, since each decorator can be tested in isolation.

### 🎯 6. Trade-offs
One thing to be careful about is that the order of decorators matters.
For example, caching before retry is usually more efficient than the other way around. 
Also, if the decorator chain becomes too deep, it can make debugging harder. So in practice, we often use a factory or composition root to manage the setup.