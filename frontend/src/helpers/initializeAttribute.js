// utils/initializeAttributes.js
export const initializeAttributes = (attributes) => {
  return attributes?.reduce((acc, attribute) => {
    if (attribute.items && attribute.items.length > 0) {
      acc[toCamelCase(attribute.id)] = attribute.items[0].id;
    }
    return acc;
  }, {});
};

export const toCamelCase = (str) => {
  return str
    .replace(/-./g, (x) => x[1].toUpperCase())
    .replace(/(\s|_|-)(.)/g, (_, __, letter) => letter.toUpperCase())
    .replace(/^\w/, (c) => c.toLowerCase());
};
