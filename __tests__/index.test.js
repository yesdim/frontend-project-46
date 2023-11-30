import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
// import * as yaml from 'js-yaml';
import genDiff from '../src/getDiff';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const readFile = (nameOfFile) => readFileSync(resolve(dirName, '..', '__fixtures__', nameOfFile), 'utf-8');

test('genDiff', () => {
  expect(genDiff(readFile('file1.json'), readFile('file2.json'))).toEqual(readFile('resultTest.txt'));
});

// test('genDiff', () => {
//   expect(genDiff(yaml.load(readFile('file1.yml')), yaml.load(readFile('file2.yaml')))).toEqual(readFile('resultTest.txt'));
// });
