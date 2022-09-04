from os import path, listdir, lstat
from constants import ROOT, AMOUNT_READ_LIMIT
from stack import Stack
from tree_node import TreeNode

class FSReader:
  __node_stack = Stack[TreeNode]()
  
  def create_fs_tree(self) -> TreeNode:
    root_node = TreeNode(ROOT, lstat(ROOT).st_size)
    self.__node_stack.append(root_node)

    while not self.__node_stack.isEmpty():
      current_node = self.__node_stack.pop()

      if not path.isdir(current_node.path):
        continue

      try:
        dir_list = listdir(current_node.path)
      except PermissionError:
        pass

      if len(dir_list) > AMOUNT_READ_LIMIT:
        continue

      for file_name in dir_list:
        absolute_path = f'{current_node.path}/{file_name}'

        try:
          new_node = TreeNode(absolute_path, lstat(absolute_path).st_size)
        except PermissionError:
          pass

        if path.isdir(new_node.path):
          self.__node_stack.append(new_node)

        current_node.append_child(new_node)

    return root_node
