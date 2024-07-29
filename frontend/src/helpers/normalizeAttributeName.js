export const toCamelCase = (str) => {
  return str
    .replace(/-./g, (x) => x[1].toUpperCase())
    .replace(/(\s|_|-)(.)/g, (_, __, letter) => letter.toUpperCase())
    .replace(/^\w/, (c) => c.toLowerCase());
};
