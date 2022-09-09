import fs from 'node:fs/promises';

import { FILE_AMOUNT_READ_LIMIT, ROOT } from '../constants/index.js';
import { Stack } from '../utils/Stack.js';
import { TreeNode } from './TreeNode.js';

// Scans only directories that user has permission to access
// Walk iteratively through system files
export async function createDirTree(): Promise<TreeNode> {
  const nodeStack = new Stack<TreeNode>();
  const rootNode = new TreeNode(ROOT);

  const initialFile = await fs.stat(rootNode.path);
  if (!initialFile.isDirectory()) {
    throw new Error('initial file is not a directory but a file');
  }

  nodeStack.push(rootNode);

  while(!nodeStack.isEmpty()) {
    try {
      const currentNode = nodeStack.pop();
      const dirFileNames = await fs.readdir(currentNode.path);
      if (dirFileNames.length > FILE_AMOUNT_READ_LIMIT) {
        continue;
      }
      for (const fileName of dirFileNames) {
        try {
          const absoluteLocation: string = `${currentNode.path}/${fileName}`;
          const scannedFile = await fs.stat(absoluteLocation);

          const newNode = new TreeNode(absoluteLocation);
          currentNode.appendChild(newNode);
          if (scannedFile.isDirectory()) {
            nodeStack.push(newNode);
          }
        } catch (e) {
          // ignore lack of permission to read directory
        }
      }
    } catch (e) {
      // ignore lack of permission to read directory
    }
  }

  return rootNode;
};