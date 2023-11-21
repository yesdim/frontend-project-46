import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import * as yaml from 'js-yaml';

const getFileContent = (pathOfFile) => readFileSync(resolve(cwd(), pathOfFile), 'utf-8');

function getExtension(pathOfFile) {
  return pathOfFile.split('.').reverse()[0];
}

function getParse(pathOfFile) {
  if (getExtension(pathOfFile) === 'yml' || getExtension(pathOfFile) === 'yaml') {
    return yaml.load(getFileContent(pathOfFile));
  }
  return JSON.parse(getFileContent(pathOfFile));
}

export default getParse;
