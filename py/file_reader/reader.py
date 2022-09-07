from os import path, listdir, lstat

from constants import ROOT, READ_LIMIT
from .stack import Stack
from .tree_node import TreeNode


def create_dir_tree() -> TreeNode:
    file_stack = Stack[TreeNode]()
    root_node = TreeNode(ROOT, lstat(ROOT).st_size)

    file_stack.append(root_node)

    while not file_stack.is_empty():
        current_node = file_stack.pop()

        if not path.isdir(current_node.path):
            continue

        try:
            dir_list = listdir(current_node.path)
        except PermissionError:
            pass

        if len(dir_list) > READ_LIMIT:
            continue

        for file_name in dir_list:
            absolute_path = f'{current_node.path}/{file_name}'

            try:
                new_node = TreeNode(
                    absolute_path, lstat(absolute_path).st_size
                )
            except PermissionError:
                pass

            if path.isdir(new_node.path):
                file_stack.append(new_node)

            current_node.append_child(new_node)

    return root_node
