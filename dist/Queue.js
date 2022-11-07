"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor() {
        this.elements = [];
    }
    add(element) {
        this.elements = [...this.elements, element];
    }
    addLeft(element) {
        this.elements = [element, ...this.elements];
    }
    pop() {
        return this.elements.pop();
    }
    peek() {
        return this.elements[this.length - 1];
    }
    get length() {
        return this.elements.length;
    }
    get isEmpty() {
        return this.length === 0;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map