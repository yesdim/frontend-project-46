import _ from 'lodash';

const getDiffTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const getTree = sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { status: 'nested', key, children: getDiffTree(data1[key], data2[key]) };
    }
    if (!(_.has(data1, key)) && _.has(data2, key)) {
      return { status: 'added', key, value: data2[key] };
    }
    if (_.has(data1, key) && !(_.has(data2, key))) {
      return { status: 'deleted', key, value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { status: 'unchanged', key, value: data1[key] };
    }
    return {
      status: 'changed', key, value1: data1[key], value2: data2[key],
    };
  });
  return getTree;
};

export default getDiffTree;
