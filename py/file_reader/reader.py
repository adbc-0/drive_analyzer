from os import path, scandir

from constants import ROOT
from .stack import Stack
from .tree_node import TreeNode


def create_dir_tree() -> TreeNode:
    file_stack = Stack[TreeNode]()
    root_node = TreeNode(ROOT, path.getsize(ROOT))

    file_stack.append(root_node)

    while not file_stack.is_empty():
        current_node = file_stack.pop()

        if not path.isdir(current_node.path):
            continue

        try:
            dir_list = scandir(current_node.path)
        except PermissionError:
            pass

        for file in dir_list:
            if file.is_symlink():
                continue

            new_node = TreeNode(file.path, file.stat().st_size)

            if file.is_dir():
                file_stack.append(new_node)

            current_node.append_child(new_node)

    return root_node
