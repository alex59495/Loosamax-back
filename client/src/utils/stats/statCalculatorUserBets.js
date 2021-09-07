import StatCalculator from "./statCalculator"

export default class StatCalculatorUserBets extends StatCalculator {
  constructor({ userBets }) {
    super()
    this.bets = userBets.filter(bet => bet.game.result)
  }

  numberBets = () => this.bets.length
  numberLoose = () => this.bets.filter(bet => bet.game.result !== bet.choice).length
  numberWin = () => this.bets.filter(bet => bet.game.result === bet.choice).length
  
  averageOddWin = () => (this.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + this.betOdd(bet)
    }
    return sum
  }, 0) / this.numberWin()).toFixed(2)
  
  averageOddLoose = () => (this.bets.reduce((sum, bet) => {
    if (bet.game.result !== bet.choice) {
      return sum + this.betOdd(bet)
    }
    return sum
  }, 0) / this.numberLoose()).toFixed(2)
  
  averageOdd = () => (this.bets.reduce((sum, bet) => {
    return sum + this.betOdd(bet)
  }, 0) / this.numberBets()).toFixed(2)
  
  winPourcentage = () => (this.numberWin() / this.numberBets())*100
  
  sumEarnings = () => (this.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + this.betOdd(bet) * 2
    }
    return sum - 2
  }, 0)).toFixed(2)

  tableEarnings = () => (this.bets.map((bet) => {
    if (bet.game.result === bet.choice) {
      return this.betOdd(bet) * 2
    }
    return - 2
  }, 0))
}