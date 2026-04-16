import { createMacButton, createMacCheckBox } from "./product";

export function createMacFactory() {
    return {
        createButton: createMacButton,
        createMacCheckBox: createMacCheckBox
    }
}