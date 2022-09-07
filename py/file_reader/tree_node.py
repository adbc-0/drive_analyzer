class TreeNode:
    """
    This objects represent scanned directory in a tree
    """

    def __init__(self, path: str, size: int) -> None:
        self.children: list[TreeNode] = []
        self.path: str = path
        self.__size: int = size

    def append_child(self, child_node) -> None:
        self.children.append(child_node)
