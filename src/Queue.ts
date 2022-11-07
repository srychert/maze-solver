export class Queue <ElementType> {
    private elements: ElementType[]

    constructor() {
        this.elements = []
    }

    add(element: ElementType): void {
        this.elements = [...this.elements, element]
    }

    addLeft(element: ElementType): void {
        this.elements = [element, ...this.elements]
    }
    
    pop(): ElementType {
        return this.elements.pop() as ElementType;
    }

    peek(): ElementType {
        return this.elements[this.length - 1];
    }

    get length(): number {
        return this.elements.length
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }
}