export const snakeToCamel = (string) => {
  return string.replace('_', ' ')
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatDate = (date) => {
  const day = date.split('T')[0].split('-')[0]
  const month = date.split('T')[0].split('-')[1]
  const year = date.split('T')[0].split('-')[2]
  const hour = date.split('T')[1].split(':')[0]
  const minutes = date.split('T')[1].split(':')[1]

  return `${day}/${month}/${year} - ${hour}:${minutes}`
}