export class TreeNode {
  children: TreeNode[] = [];
  path: string;
  size: number = 0;

  constructor(path: string) {
    this.path = path;
  };

  appendChild(childNode: TreeNode): void {
    this.children.push(childNode);
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

  getPath(): string {
    return this.path;
  };

  printTree(): void {
    throw new Error('not implemented');
  };
};
