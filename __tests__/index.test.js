import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const readFile = (nameOfFile) => readFileSync(resolve(dirName, '..', '__fixtures__', nameOfFile), 'utf-8');

const cases = [
  ['__fixtures__/file1.json', '__fixtures__/file2.json', readFile('stylishTest.txt')],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yaml', readFile('stylishTest.txt')],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', readFile('stylishTest.txt'), 'stylish'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yaml', readFile('stylishTest.txt'), 'stylish'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', readFile('plainTest.txt'), 'plain'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yaml', readFile('plainTest.txt'), 'plain'],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', readFile('jsonTest.txt'), 'json'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yaml', readFile('jsonTest.txt'), 'json'],
];

describe('output format', () => {
  test.each(cases)('difference %s and %s', (a, b, result, format = 'stylish') => {
    expect(genDiff(a, b, format)).toEqual(result);
  });
});
