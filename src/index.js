import genDiff from './getDiff.js';
import getParse from './parser.js';

export default (filepath1, filepath2) => genDiff(getParse(filepath1), getParse(filepath2));
