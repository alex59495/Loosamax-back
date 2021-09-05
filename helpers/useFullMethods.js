const getNextMonday = (date) => {
  return new Date(date.setDate(date.getDate() + ((7-date.getDay())%7+1) % 7)).toISOString().slice(0, 10)
}

module.exports = {getNextMonday}

// arr.map((it, index) => {
//   return it + arr.slice(0, index).reduce((sum, acc) => sum + acc, 0)
// })