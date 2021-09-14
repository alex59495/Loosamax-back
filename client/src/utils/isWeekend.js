export const isWeekend = () => {
  return [0,1,6].includes(new Date().getDay())
}