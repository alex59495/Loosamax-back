export const isWeekend = () => {
  return [0,1,6].includes(new Date().getDay()) || (new Date().getDay() === 5 && new Date().getHours() > 20)
}