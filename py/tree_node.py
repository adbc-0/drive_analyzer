class TreeNode:
  def __init__(self, path: str, size: int) -> None:
    self.children: list[TreeNode] = []
    self.path: str = path
    self.__size: int = size

  def append_child(self, childNode) -> None:
    self.children.append(childNode)
