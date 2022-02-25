export const alphabeticalSort = (arr, value) => {
  return arr.sort((a, b) =>
    a[`${value}`].toLowerCase().localeCompare(b[`${value}`].toLowerCase())
  );
};
