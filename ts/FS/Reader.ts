import fs from 'node:fs/promises';

import { FILE_AMOUNT_READ_LIMIT, ROOT } from '../constants/index.js';
import { Stack } from '../utils/Stack.js';
import { TreeNode } from './TreeNode.js';

// Scans only directories that user has permission to access
// Walk iteratively through system files
export class FSReader {
  #nodeStack = new Stack<TreeNode>();

  async createFSTree(): Promise<TreeNode> {
    const rootNode = new TreeNode(ROOT);

    const initialFile = await fs.stat(rootNode.path);
    if (!initialFile.isDirectory()) {
      throw new Error('initial file is not a directory but a file');
    }

    this.#nodeStack.push(rootNode);

    while(!this.#nodeStack.isEmpty()) {
      try {
        const currentNode = this.#nodeStack.pop();
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
              this.#nodeStack.push(newNode);
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
};

// import { spawn } from 'child_process';
// function getDirSize(path: string) {
  // const size = spawn('du', ['-sh', '-k', path, ' | cut -f1']);
  // size.stdout.on('data', (data) => {
    // const buf = Buffer.from(data);
    // console.log(buf.toString());
  // });
// }
