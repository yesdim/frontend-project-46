import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  let keys = _.union(keys1, keys2);
  keys = _.sortBy(keys);
  const getStr = keys.map((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return `  ${key}: ${data1[key]}`;
      }
      return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
    } if (_.has(data1, key) && !(_.has(data2, key))) {
      return `- ${key}: ${data1[key]}`;
    } return `+ ${key}: ${data2[key]}`;
  });
  const tmp = getStr.flat();
  return `{\n  ${tmp.join('\n  ')}\n}`;
};

export default genDiff;