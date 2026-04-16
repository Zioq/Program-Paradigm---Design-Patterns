function runApp(factory) {
    const button = factory.createButton()
    const checkbox = factory.createCheckbox()

    button.render()
    checkbox.render()
}