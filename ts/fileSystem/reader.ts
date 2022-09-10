import fs from 'node:fs/promises';

import { ROOT } from '../constants/index.js';
import { Stack } from '../utils/Stack.js';
import { TreeNode } from './TreeNode.js';

// Scans only directories that user has permission to access
// Walk iteratively through system files
export async function createDirTree(): Promise<TreeNode> {
  const fileStack = new Stack<TreeNode>();
  const rootNode = new TreeNode(ROOT);

  fileStack.push(rootNode);

  while(!fileStack.isEmpty()) {
    const currentNode = fileStack.pop();
    const scannedFile = await fs.lstat(currentNode.getAbsPath());

    if (!scannedFile.isDirectory) {
      continue;
    }

    const fileNameList = await fs.readdir(currentNode.getAbsPath());

    for (const fileName of fileNameList) {
      const fileAbsPath = `${currentNode.getAbsPath()}/${fileName}`;
      const scannedFile = await fs.lstat(fileAbsPath);

      if (scannedFile.isSymbolicLink()) {
        continue;
      }

      const newNode = new TreeNode(fileAbsPath);

      if (scannedFile.isDirectory()) {
        fileStack.push(newNode);
      }

      currentNode.appendChild(newNode);
    }
  }

  return rootNode;
};
