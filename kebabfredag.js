const Days = {
  friday: 5
}

const specialDays = JSON.parse(require('fs').readFileSync('resources/special_days.json'))

const kebabfredag = {
  ere: function(date) {
    if (!(date instanceof Date)) {
      date = new Date()
    }
    const specialDay = `${date.getMonth()}_${date.getDate()}`
    if (specialDays[specialDay]) {
      return true
    }
    if (date.getDay() == Days.friday) {
      return true
    }
    return false
  }
}

module.exports = kebabfredag;
