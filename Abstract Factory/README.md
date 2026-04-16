# Abstract Factory

### Intent
**Abstract Factory** is a creational design pattern that lets you produce familes of related objects without specifying their concrete classes.

**Abstract Factory** is a design pattern that allows respecting the `Open-Closed Principle` principle and delegates the responsibility for creating objects to specific classes (concrete factories) using `polymorphism`.

Why is *'Open-Closed Principle'* Involved?
-
OCP **means:**
> Software should be open for extension, but closed for modification.

❌ Without Abstact Factory
```
function createButton(os) {
  if (os === 'mac') return new MacButton();
  if (os === 'windows') return new WindowsButton();
  // Adding a new Linux Button
  if (os === 'linux') return new LinuxButton();
}
```
⚠️ Issue 1: Modifiying exsting code every time you add a new type
⚠️ Issue 2: This violates OCP

✅ With Abstract Factory

```
function renderUI(factory) {
  const button = factory.createButton();
  button.render();
}

```

```
const linuxFactory = createLinuxFactory();
```
🎉 You add new code, but do NOT modify exisitng logic list `renderUI`

Why is *'Polymorphism'* involved?
- 
Polymorphism **means:**
> Different objects can be used through the same inferface.
> The ability of a variable, function, or object to take on multiple forms. It allows different classes to define behaviors for the same interface or method name, enabling more flexible, reusable, and extensible code

Key facts
- **Core mechnism**: Inheritance and method overriding
- **Primary benefit**: Enables a single interface to represent multiple behaviors.

Example: In Abstract Factory
```
function renderUI(factory){
    const button = factory.createButton()
    button.render()
}
```
This function does NOT care:
- whether `factory` is Mac, Window or Linux

What actually changes?
| Factory Type   | Behavior of `button.render()` |
| -------------- | ----------------------------- |
| MacFactory     | "Mac Button"                  |
| WindowsFactory | "Windows Button"              |
| LinuxFactory   | "Linux Button"                |

✅ Same code
✅ Different behavior

**🔥That is polymorphism**
- Same Interface: `factory.createButton()`
- Different implementations underneath
 
## Clean one-paragraph explanations
Abstract Factory supports the Open-Closed Principle by allowing new families of related objects to be introduced through new factory implementations without modifying existing client code. It relies on polymorphism because all factories share a common interface, enabling them to be used interchangeably. This interchangeable behavior allows the system to extend functionality safely without changing existing logic.

