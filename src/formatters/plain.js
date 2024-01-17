const getValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const getPlainFormat = (tree) => {
  const iter = (tree2, path = '') => {
    const filterTree = tree2.filter((item) => item.status !== 'unchanged');
    const mapTree = filterTree.map((child) => {
      const currentPath = `${path}${child.key}`;
      switch (child.status) {
        case 'nested':
          return iter(child.children, `${currentPath}.`);
        case 'added':
          return `Property '${currentPath}' was added with value: ${getValue(child.value)}`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${getValue(child.value1)} to ${getValue(child.value2)}`;
        default:
          return `Property '${currentPath}' was removed`;
      }
    });
    return mapTree.join('\n');
  };
  return iter(tree);
};

export default getPlainFormat;
