// LIFO data structure, stack is commonly used to avoid resursion
export class Stack<T> {
  #items: T[] = [];

  isEmpty(): Boolean {
    return !this.#items.length;
  };

  push(item: T): void {
    this.#items.push(item);
  };

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('accessing empty stack');
    }
    return this.#items.at(-1)!;
  };

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('popping from empty stack');
    }
    return this.#items.pop()!;
  };
};
