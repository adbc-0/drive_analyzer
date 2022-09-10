import { readdir, lstat } from 'fs/promises';

import { ROOT } from '../constants/index.js';
import { allowedErrorCodes, isNodeError } from '../utils/Error.js';
import { Stack } from '../utils/Stack.js';
import { TreeNode } from './TreeNode.js';

// Scans only directories that user has permission to access
// Walk iteratively through system files
export async function createDirTree(): Promise<TreeNode> {
  const fileStack = new Stack<TreeNode>();
  const rootNode = new TreeNode(ROOT);

  fileStack.push(rootNode);

  while (!fileStack.isEmpty()) {
    const currentNode = fileStack.pop();
    try {
        const fileNameList = await readdir(currentNode.getAbsPath());
        const dirPath = currentNode.getAbsPath();

        async function scanDirFiles(fileName: string) {
          const fileAbsPath = dirPath + '/' + fileName;
          const scannedFile = await lstat(fileAbsPath);

          if (scannedFile.isSymbolicLink()) {
            return;
          }

          const newNode = new TreeNode(fileAbsPath);

          if (scannedFile.isDirectory()) {
            fileStack.push(newNode);
          }

          currentNode.appendChild(newNode);
        }

        await Promise.all(fileNameList.map(scanDirFiles));
      } catch (error) {
        if (!isNodeError(error)) throw error;
        if (!error.code) throw error;
        if (!allowedErrorCodes.has(error.code)) throw error;
      }
    }

    return rootNode;
};
