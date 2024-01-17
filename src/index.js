import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import getDiffTree from './getDiff.js';
import getParse from './parser.js';
import getFormat from './formatters/index.js';

function getExtension(pathOfFile) {
  const components = pathOfFile.split('.');
  const dataFormat = components.at(-1);
  return dataFormat;
}

const getFileContent = (pathOfFile) => readFileSync(resolve(cwd(), pathOfFile), 'utf-8');

export default (filepath1, filepath2, format = 'stylish') => {
  const dataFormat1 = getExtension(filepath1);
  const dataFormat2 = getExtension(filepath2);
  const fileContent1 = getFileContent(filepath1);
  const fileContent2 = getFileContent(filepath2);

  const firstObject = getParse(fileContent1, dataFormat1);
  const secondObject = getParse(fileContent2, dataFormat2);
  const astTree = getDiffTree(firstObject, secondObject);
  return getFormat(astTree, format);
};
