/* 
    Simple Prototype

*/
const enemy = {
    type: "orc",
    health: 100,

    clone() { // copy machine
        return {...this}
    }
}
const enemy1 = enemy.clone();
const enemy2 = enemy.clone();

enemy1.health = 50;

console.log(enemy.health);  // 100
console.log(enemy1.health); // 50


/* 
    Prototype with class
*/

class Enemy {
    type: string;
    health: number;

    constructor(type: string, health: number) {
        this.type = type;
        this.health = health;
    }

    clone() { // In this clone(), return a new class
        return new Enemy(this.type, this.health)
    }
}

const baseOrcEnemy = new Enemy("orc", 100);

const b_Orc_enemy1 = baseOrcEnemy.clone();
const b_Orc_enemy2 = baseOrcEnemy.clone();

console.log(b_Orc_enemy1);
console.log(b_Orc_enemy2);

function createEnemy(type:string) {
    if (type == 'orc') return new Enemy("orc", 100);
    if (type == 'troll') return new Enemy("troll", 50);
}

/* 
    What is the issue above?
    If we need to make a new type of the monster, we have to edit the function and add the if
*/

// Dynamically scalable using a Record
// built-in generic type used to construct an object type with a fixed set of property keys and a uniform value type
const prototypes: Record <string, Enemy> = {
    orc: new Enemy("orc", 100),
    troll: new Enemy("troll", 50)
}

function spawn(type:string) {
    return prototypes[type].clone
}
const enemy_orc = spawn("orc");

//Open-Closed Principle
prototypes["dragon"] = new Enemy("dragon", 500);
console.log(prototypes)


/* Shallow Copy vs Deep Copy */
interface EnemyState {
    health: number
}

class Enemy_v2 {
    type: string
    stats: EnemyState

    constructor(type: string, stats: EnemyState) {
        this.type = type
        this.stats = stats
    }

    clone() {
        return new Enemy_v2(this.type, this.stats) // this.state -> Object(reference type), so it shares reference. 
    }
}

const base2 = new Enemy_v2("orc", {health: 100})

const e1 = base2.clone();
const e2 = base2.clone();

e1.stats.health = 50;

console.log(e2) // ❌ Enemy_v2 { type: 'orc', stats: { health: 50 } } -> BUG!! Becuase of the object(reference type) -> Shallow Copy


class Enemy_3 {
    type: string
    stats: EnemyState

    constructor(type:string, stats: EnemyState) {
        this.type = type
        this.stats = stats
    }

    clone() {
        return new Enemy_3(this.type, {...this.stats})
    }
}
const v3_base = new Enemy_3("orc", {health: 100})

const v3_e1 = v3_base.clone();
const v3_e2 = v3_base.clone();

v3_e2.stats.health = 50 
console.log(v3_e1) //✅ Enemy_3 { type: 'orc', stats: { health: 100 } }
console.log(v3_e2) //✅ Enemy_3 { type: 'orc', stats: { health: 50 } }


/* 
    Be aware of the clone for reference type data (arr, obj) 🔥
*/

class Enemy_v4 {
    inventory : string []
    constructor(inventory: string[]) {
        this.inventory = inventory
    }

    clone() {
        return new Enemy_v4(this.inventory) // ❌ this inventory array shared. 
    }
}

const v4_base = new Enemy_v4([])
const v4_e1 = v4_base.clone()
const v4_e2 = v4_base.clone()
v4_e1.inventory.push('sword')
console.log(v4_e2) // 👾 Enemy_v4 { inventory: [ 'sword' ] }


/* 
    how to fix it? 
    clone() {
        return new Enemy_v4([...this.inventory]) // ✅ use deep copy
    }
*/



/* 
    Polymorphic `this`

    A method returns the exact type of the object that called it - not just the base class.
*/

/* ❌ Problem WITHOUT `this` */
class Animal {
    move(): Animal {
        return this;
    }
}

class Dog extends Animal {
    bark() {
        console.log("woof");
    }
}

const dog = new Dog();
const result = dog.move(); // const result: Animal
//result.bark() // ❌ Property 'bark' does not exist on type 'Animal'. Even though at runtime it's actually a Dog.


/* ✅ Solution: Polymorphic `this` 
    `this` means: “Return the same type as the object calling this method”

    Why it's called polymorphic
    poly = many
    morphic = forms

    👉 The return type changes depending on who calls the method
    | Caller | Return type |
    | ------ | ----------- |
    | Animal | Animal      |
    | Dog    | Dog         |

*/
class Animal_v2 {
    move(): this {
        return this
    }
}

class Dog_v2 extends Animal_v2 {
    bark() {
        console.log("woof v2");
    }
}
const dog_v2 = new Dog_v2()
const result_v2 = dog_v2.move() //const result_v2: Dog_v2
result_v2.bark() // ✅

// 💡 Where this is used (very important)
// Ex1) Method chaining
//👉 Without this, chaining breaks in subclasses.
class Builder {
    setName(name:string) : this {
        return this
    }

    setAge(age: number): this {
        return this
    }
}

class UserBuilder extends Builder {
    setEmail(email: string): this {
        return this
    }
}

new UserBuilder()
    .setName("Robert")
    .setAge(35)
    .setEmail("abc@test.com") // ✅ works

/* Wrong Case */
class WrongBuilder {
    setName(name: string): WrongBuilder {
        return this;
    }

    setAge(age: number): WrongBuilder {
        return this;
    }
}

class UserWrongBuilder extends WrongBuilder {
    setEmail(email: string): this {
        return this;
    }
}
const builder = new UserWrongBuilder();
//builder.setName("J").setEmail("x@test.com"); // ❌ Property 'setEmail' does not exist on type 'WrongBuilder'.


// ⚠️ VERY IMPORTANT (Senior-level insight)
// ❌ Dangerous pattern
interface EnemyPrototype {
    clone(): EnemyPrototype;
    setPos(x: number, y: number): void;
}
class Orc implements EnemyPrototype {
    weapon: string
    health: number

  constructor(weapon: string, health: number) {
    this.weapon = weapon,
    this.health = health
  }

    public clone(): this {
        /* 
            ⚠️⚠️⚠️⚠️⚠️⚠️
            Type says: “I return the same subtype”
            Reality: Always returns Orc
            Cuz the implementation literally creates an Orc object.

            as this does not change the real object.
            It only tells TypeScript:
                “Please treat this value as if it were the current subtype.”

        */
        return new Orc(this.weapon, this.health) as this;
    }

    public setPos(x: number, y: number): void {
        console.log(`Orc with ${this.weapon} spawned at ${x}, ${y}`);
    }
}

// 💥 Bug scenario
class FireOrc extends Orc {
    fireDamage = 30;
}

const fireOrc = new FireOrc("axe", 100);
const cloned = fireOrc.clone(); // Since FireOrc does not override clone(), it uses Orc’s version:
/* 
    ^ Then, why cloned is 'const cloned: FireOrc'?
    Because of this method signature: clone(): this
    When fireOrc.clone() is called, TypeScript interprets this as: FireOrc
    So TypeScript infers: const cloned: FireOrc
    That is the polymorphic this behavior.
    But the implementation cheated with: as this
    so TypeScript trust you
*/


console.log(cloned instanceof Orc) // true
console.log(cloned instanceof FireOrc) // false
console.log(cloned.fireDamage) // undefined

/* 
    This is the mental model
clone(): this means: “I promise to return the same concrete subtype as the caller.”
But your code does: “I always construct an Orc.”
That is why the contract is broken.

*/

/* How to fix this issue? */

// 1) Option 1: Override in FireOrc
class Orc_v1 implements EnemyPrototype {
    weapon: string
    health: number

  constructor(weapon: string, health: number) {
    this.weapon = weapon,
    this.health = health
  }

    public clone(): this {
        return new Orc(this.weapon, this.health) as this;
    }

    public setPos(x: number, y: number): void {
        console.log(`Orc with ${this.weapon} spawned at ${x}, ${y}`);
    }
}

class FireOrc_v1 extends Orc_v1 {
    fireDamage : number
    constructor(weapon:string, health:number, fireDamage: number) {
        super(weapon, health)
        this.fireDamage = fireDamage
    }
    // Manage clone in the class
    clone(): this {
        return new FireOrc_v1(this.weapon, this.health, this.fireDamage) as this
    }
}

// 2) Protected factory method
abstract class Enemy_final {
    weapon: string
    health: number
    constructor(weapon: string, health: number) {
        this.weapon = weapon
        this.health = health
    }

    protected abstract createClone(): this;

    clone(): this { // Pulic API
        return this.createClone()
    }
}

class Orc_final extends Enemy_final {
    constructor(weapon: string, health: number) {
        super(weapon, health)
    }

    protected createClone() {
        return new Orc_final(this.weapon, this.health) as this
    }
}

class FireOrc_final extends Enemy_final {
    fireDamage: number
    constructor(weapon: string, health: number, fireDamage: number) {
        super(weapon, health)
        this.fireDamage = fireDamage
    }

    protected createClone(): this {
        return new FireOrc_final(this.weapon, this.health, this.fireDamage) as this
    }
}

