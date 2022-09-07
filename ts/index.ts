import { FSReader } from './FS/Reader.js';

const reader = new FSReader();
await reader.createFSTree();
