import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import genDiff from './getDiff.js';

const getFileContent = (pathOfFile) => readFileSync(resolve(cwd(), pathOfFile), 'utf-8');

export default (filepath1, filepath2) => {
  const firstObj = JSON.parse(getFileContent(filepath1));
  const secondObj = JSON.parse(getFileContent(filepath2));
  return genDiff(firstObj, secondObj);
};
