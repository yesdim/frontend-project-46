import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import getDiffTree from './getDiff.js';
import getParse from './parser.js';
import getStylishFormat from './format/stylish.js';

function getExtension(pathOfFile) {
  return pathOfFile.split('.').reverse()[0];
}

const getFileContent = (pathOfFile) => readFileSync(resolve(cwd(), pathOfFile), 'utf-8');

export default (filepath1, filepath2, format = 'stylish') => {
  const dataFormat1 = getExtension(filepath1);
  const dataFormat2 = getExtension(filepath2);
  const fileContent1 = getFileContent(filepath1);
  const fileContent2 = getFileContent(filepath2);

  const firstObject = getParse(fileContent1, dataFormat1);
  const secondObject = getParse(fileContent2, dataFormat2);
  const tmp = getDiffTree(firstObject, secondObject);
  return getStylishFormat(tmp, format);
};
