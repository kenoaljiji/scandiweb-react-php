export const normalizeAttributeName = (name) => {
  return name.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
};
