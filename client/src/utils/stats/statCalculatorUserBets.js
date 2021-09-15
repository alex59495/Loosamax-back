import StatCalculator from "./statCalculator";

import { isWeekend } from "../isWeekend";

export default class StatCalculatorUserBets extends StatCalculator {
  constructor({ userBets }) {
    super()
    this.bets = userBets.filter(bet => bet.game.result)
    this.lastBet = this.bets.slice(-1)[0]
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

  get lastBetWinOdd() { 
    return this.lastBet && this.betWinCondition(this.lastBet) ? this.betOdd(this.lastBet) : null
  }

  get lastBetLooseOdd() { 
    return this.lastBet && !this.betWinCondition(this.lastBet) ?  this.betOdd(this.lastBet) : null
  }

  get numberBets() { return this.bets.length }
  get numberLoose() { return this.bets.filter(bet => !this.betWinCondition(bet)).length }
  get numberWin() { return this.bets.filter(bet => this.betWinCondition(bet)).length }
  
  get averageOddWin() { return (this.bets.reduce((sum, bet) => {
    if (this.betWinCondition(bet)) {
      return sum + this.betOdd(bet)
    }
    return sum
  }, 0) / this.numberWin).toFixed(2) }
  
  get averageOddLoose() { return (this.bets.reduce((sum, bet) => {
    if (!this.betWinCondition(bet)) {
      return sum + this.betOdd(bet)
    }
    return sum
  }, 0) / this.numberLoose).toFixed(2) }
  
  get averageOdd() { return (this.bets.reduce((sum, bet) => {
    return sum + this.betOdd(bet)
  }, 0) / this.numberBets).toFixed(2) }
  
  get winPourcentage() { return Math.round((this.numberWin / this.numberBets)*100) }
  
  get sumEarnings() { return (this.bets.reduce((sum, bet) => {
    if (this.betWinCondition(bet)) {
      return sum + this.betOdd(bet) * 2
    }
    return sum
  }, 0)).toFixed(2) }

  get tableEarnings() { return (this.bets.map((bet) => {
    if (this.betWinCondition(bet)) {
      return this.betOdd(bet) * 2 - 2
    }
    return - 2
  }, 0)) }

  get globalEarning() { return (this.bets.reduce((sum, bet) => {
    if (this.betWinCondition(bet)) {
      return sum + (this.betOdd(bet) * 2) - 2
    }
    return sum - 2
  }, 0)).toFixed(2) }
}