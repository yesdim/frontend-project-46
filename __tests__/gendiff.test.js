import { expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import genDiff from '../src/getDiff';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const readFile = (nameOfFile) => readFileSync(resolve(dirName, '..', '__fixtures__', nameOfFile), 'utf-8');

test('genDiff', () => {
  expect(genDiff(JSON.parse(readFile('file1.json')), JSON.parse(readFile('file2.json')))).toEqual(readFile('resultTestJson.txt'));
});