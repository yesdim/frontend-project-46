import * as yaml from 'js-yaml';

const getParse = (fileContent, format) => {
  switch (format) {
    case 'JSON':
      return JSON.parse(fileContent);
    case 'YAML':
      return yaml.load(fileContent);
    default:
      return yaml.load(fileContent);
  }
};

export default getParse;
