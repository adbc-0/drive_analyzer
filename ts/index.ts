import process from 'process';

import { FSReader } from './FS/Reader.js';

const start = process.hrtime();

const reader = new FSReader();
const tree = await reader.createFSTree();
// tree.printTree();

const stop = process.hrtime(start);
console.log(`Time Taken to execute: ${(stop[0] * 1e9 + stop[1])/1e9} seconds`);