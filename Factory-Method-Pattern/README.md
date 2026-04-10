Factory Method Pattern
	The Factory Method Pattern is a design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It promotes loose coupling by eliminating the need to bind application-specific classes into the code.

	Factory Method is a creational design pattern where a superclass defines a method for object creation, and subclasses decide which concrete product to instantiate.
	

	Encapsulates object creation by delegating the instantiation logic to subclasses.

📌 How It Works
    1. Headquarters issues a command: “Produce a vehicle.”
		→ This is abstracted as the factoryMethod().
	2. Each factory produces vehicles based on its specialization.
		→ Concrete classes handle instantiation, e.g., new SUV(), new Sedan().
	3. The client (buyer) only decides which factory to use.
		→ For example: new SUVFactory().createVehicle()

	🔍 The Factory Method pattern promotes loose coupling by eliminating the need for the client to know the exact class being instantiated, and instead relies on a common interface.