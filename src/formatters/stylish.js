const getCurrentIndent = (depth, intend = 4) => ' '.repeat(intend * depth - 2);
const getClosingIndent = (depth, intend = 4) => ' '.repeat(intend * depth - intend);

const stringfy = (value, depth = 1) => {
  const iter = (currentValue, depthIter) => {
    const iterIndent = getCurrentIndent(depthIter);
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }
    const massValue = Object.entries(currentValue);
    const lines = massValue.map(([key, val]) => `${iterIndent}  ${key}: ${iter(val, depthIter + 1)}`);
    const result = ['{', ...lines, `${getClosingIndent(depthIter)}}`].join('\n');
    return result;
  };
  return iter(value, depth);
};

const getStylishFormat = (diffTree) => {
  const iter = (diffObj, depth = 1) => {
    const iterIndent = getCurrentIndent(depth);
    const closingIndent = getClosingIndent(depth);

    const result = diffObj.flatMap((user) => {
      switch (user.status) {
        case 'nested':
          return `${iterIndent}  ${user.key}: ${iter(user.children, depth + 1)}`;
        case 'deleted':
          return `${iterIndent}- ${user.key}: ${stringfy(user.value, depth + 1)}`;
        case 'added':
          return `${iterIndent}+ ${user.key}: ${stringfy(user.value, depth + 1)}`;
        case 'changed':
          return [`${iterIndent}- ${user.key}: ${stringfy(user.value1, depth + 1)}`,
            `${iterIndent}+ ${user.key}: ${stringfy(user.value2, depth + 1)}`];
        default:
          return `${iterIndent}  ${user.key}: ${stringfy(user.value, depth + 1)}`;
      }
    });
    return ['{', ...result, `${closingIndent}}`].join('\n');
  };

  return iter(diffTree);
};

export default getStylishFormat;
