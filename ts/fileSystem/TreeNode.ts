// Store name, parent, size and type in future?

export class TreeNode {
  #children: TreeNode[] = [];
  #path: string;

  constructor(path: string) {
    this.#path = path;
  };

  appendChild(childNode: TreeNode): void {
    this.#children.push(childNode);
  };

  deleteNode(): void {
    throw new Error('not implemented');
  };

  findPath(): void {
    throw new Error('not implemented');
  };

  generateTreeMap(): void {
    throw new Error('not implmented');
  };

  getAbsPath(): string {
    return this.#path;
  };

  printTree(): void {
    throw new Error('not implemented');
  };
};
