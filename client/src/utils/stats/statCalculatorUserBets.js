import StatCalculator from "./statCalculator";

import { isWeekend } from "../isWeekend";

export default class StatCalculatorUserBets extends StatCalculator {
  constructor({ userBets }) {
    super()
    this.bets = userBets.filter(bet => bet.game.result)
    let bet
    if(isWeekend()) {
      bet = userBets[userBets.length - 1]
    } else if(userBets.some(bet => !bet.game.result)) {
      bet = userBets.find(bet => !bet.game.result)
    } else {
      bet = null
    }
    this.currentBet = bet
  }

  get numberBets() { return this.bets.length }
  get numberLoose() { return this.bets.filter(bet => bet.game.result !== bet.choice).length }
  get numberWin() { return this.bets.filter(bet => bet.game.result === bet.choice).length }
  
  get averageOddWin() { return (this.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + this.betOdd(bet)
    }
    return sum
  }, 0) / this.numberWin).toFixed(2) }
  
  get averageOddLoose() { return (this.bets.reduce((sum, bet) => {
    if (bet.game.result !== bet.choice) {
      return sum + this.betOdd(bet)
    }
    return sum
  }, 0) / this.numberLoose).toFixed(2) }
  
  get averageOdd() { return (this.bets.reduce((sum, bet) => {
    return sum + this.betOdd(bet)
  }, 0) / this.numberBets).toFixed(2) }
  
  get winPourcentage() { return Math.round((this.numberWin / this.numberBets)*100) }
  
  get sumEarnings() { return (this.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + this.betOdd(bet) * 2
    }
    return sum
  }, 0)).toFixed(2) }

  get tableEarnings() { return (this.bets.map((bet) => {
    if (bet.game.result === bet.choice) {
      return this.betOdd(bet) * 2 - 2
    }
    return - 2
  }, 0)) }

  get globalEarning() { return (this.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + (this.betOdd(bet) * 2) - 2
    }
    return sum - 2
  }, 0)).toFixed(2) }
}