const getNextMonday = (date) => {
  return new Date(date.setDate(date.getDate() + ((7-date.getDay())%7+1) % 7)).toISOString().slice(0, 10)
}

module.exports = {getNextMonday}