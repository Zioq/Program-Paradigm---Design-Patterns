## Prototype 🍪(a.k.a clone)
![alt text](image.png)


The **Prototype** design pattern is a creational pattern used when you want to create new objects by copying an existing object (the "prototype") rather than creating them from scratch using a constructor. This is particularly useful in TypeScript when object creation is expensive or *when you want to keep your code decoupled from the specific classes* of objects you need to clone. 🛠️

In TypeScript, this pattern usually involves an interface with a `clone()` method.


## Prototype Pattern (Basic)
The Prototype Pattern creates new objects by copying an existing object.

Instead of:
- Creating objects using `new`

We:
- Clone a pre-configured object

Why?
- Avoid repeating setup logic
- Easily create many similar objects

Example:
- Base enemy → clone → spawn multiple enemies

Key Idea:
"Create once, duplicate many times"

## Prototype Pattern (Advanced)

### Core Problem
Cloning objects with nested mutable state can introduce shared references.

### Key Concepts

1. Shallow vs Deep Copy
- Shallow: copies references
- Deep: copies actual values

2. Shared State Risk
- Arrays / objects must be cloned properly

3. Polymorphic `this`
- Preserves subtype during cloning

### Best Practices

- Clone only mutable fields deeply
- Avoid unnecessary deep copies (performance)
- Combine with Factory for clean architecture

### Rule of Thumb
"Clone structure, but isolate mutable state"


#### PLUS, Polymorphic `this` in TypeScript
Polymorphic `this` is a TypeScript feature that allows a method to return the **exact subtype of the current instance**, rather than only the base class type.

It is especially useful in:

- fluent APIs
- method chaining
- builders
- inheritance-friendly class hierarchies
- clone-style APIs

👾 The Tricky Part

Polymorphic this is powerful, but it also creates one of the easiest ways to accidentally lie to the type system.

The most common issue appears in clone methods.

```
interface EnemyPrototype {
    clone(): EnemyPrototype;
    setPos(x: number, y: number): void;
}

class Orc implements EnemyPrototype {
    constructor(
        public weapon: string,
        public health: number
    ) {}

    clone(): this {
        return new Orc(this.weapon, this.health) as this;
    }

    setPos(x: number, y: number): void {
        console.log(`Orc with ${this.weapon} spawned at ${x}, ${y}`);
    }
}

class FireOrc extends Orc {
    fireDamage = 30;
}

const fireOrc = new FireOrc("axe", 100);
const cloned = fireOrc.clone();
console.log(cloned instanceof Orc) // true
console.log(cloned instanceof FireOrc) // false
console.log(cloned.fireDamage) // undefined
```

⚠️ Why This Is Dangerous?
The method signature says:
```
clone(): this
```
This means:
> “I promise to return the same concrete subtype as the caller.”

So when fireOrc.clone() is called, TypeScript infers:
```
const cloned: FireOrc
```
However, the implementation does this:
```
return new Orc(this.weapon, this.health) as this;
```
That means the actual runtime object is:
```
new Orc(...)
```
not `new FireOrc(...)`.

##### Static Type vs Runtime Reality
TypeScript believes:
```
cloned: FireOrc
```
Runtime reality:
```
cloned instanceof Orc      // true
cloned instanceof FireOrc  // false
cloned.fireDamage          // undefined
```
##### Root Cause
The issue is not polymorphic this itself.
The issue is this pattern:
```
new Orc(...) as this
```
This is a type assertion, not a real subtype-preserving implementation.
It tells TypeScript:“Trust me, this value is the same subtype as the caller.”
But that is false.

##### Important Mental Model
`this` *as a return type is a contract*

When you write:
```
clone(): this
```
you are making a strong promise:
> “This method returns the exact same concrete type as the current instance.”
If the implementation does not truly preserve that subtype, then the method is unsafe.

##### Common Pitfalls
**1. Hardcoding the base class constructor**
```
clone(): this {
    return new Orc(this.weapon, this.health) as this;
}
```
Why it is wrong?
It always creates Orc, even when called by a subclass.

**2. Using as this to silence TypeScript**
```
return new Orc(...) as this;
```

⚠️ Why it is dangerous
It hides the mismatch between the actual runtime object and the declared return type.

**3. Forgetting subclass state**
```
class FireOrc extends Orc {
    fireDamage = 30;
}
```
If clone only copies the `Orc` fields, then subclass-specific state is lost.

**4. Assuming polymorphic this automatically handles constructors**

It does not.
TypeScript only changes the static type of the return value.
It does not magically know how to construct the correct subclass instance.

✅**Safe Solutions**

Solution 1: Override clone() in each subclass -> This is the most direct and common fix.
- Trade-off: You must remember to override clone() whenever a subclass adds new fields.

Solution 2: Use an abstract factory method -> This is a cleaner and more extensible design.
Why it is better
- public cloning API remains consistent
- subclass construction responsibility is explicit
- easier to reason about in inheritance-heavy systems

Solution 3: Avoid this if subtype preservation is not guaranteed
When this is appropriate
- the class is not intended to be subclassed
- the clone method only guarantees the base type
- inheritance-safe cloning is not required

💡 **When You Should Use Polymorphic this**
Use it when all of the following are true:
- the method conceptually returns the current instance type
- subtype preservation is important
- subclasses should remain chainable or type-safe
- the implementation can truly honor the contract

❌ **When You Should Avoid It**
Avoid polymorphic this when:
- the method may return only the base class
- subtype preservation is not guaranteed
- the implementation hardcodes a base-class constructor
- subclasses are likely to add important state that is not copied
- you are relying on as this to suppress errors

**Rule of Thumb**

Use `this` when:
> “This method should return the same exact subtype as the caller.”

DO NOT use `this` when:
> “This method only guarantees a base-type return.”

**Senior-Level Insight** 

Polymorphic this is not just syntax sugar.
It is a type design tool for preserving subtype information across inheritance.
But because it is a strong promise, it also forces you to think carefully about:
- runtime construction
- subclass extensibility
- cloning safety
- API contracts
- whether the implementation truly matches the declared type

In other words:
>The real difficulty of polymorphic this is not the syntax.
>It is keeping the runtime behavior aligned with the type-level promise.


**👍 Best Practices**
1. Treat this as a contract, not a convenience.
Only use it when you can fully honor subtype preservation.

2. Be suspicious of as this.
It often means you are bypassing a real type mismatch.

3. Override clone logic in subclasses when needed.
If subclasses add new state, their clone logic usually must change too.

4. Prefer abstract factory hooks for extensible hierarchies.
This makes subclass responsibilities explicit.

5. Use this heavily in fluent APIs and builders.
This is where it provides the most value and the least risk.