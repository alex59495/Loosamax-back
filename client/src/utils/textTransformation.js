export const snakeToCamel = (string) => {
  return string.replace('_', ' ')
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}