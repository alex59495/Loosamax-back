import StatCalculator from './statCalculator'
import StatCalculatorUserBets from './statCalculatorUserBets';

import {hexToRgb} from '../../utils/textTransformation';

export default class StatCalculatorUsers extends StatCalculator {

  constructor({ users }) {
    super()
    this.users = users
  }

  getUserLastResult() { 
    return this.users.map(user => {
      const gameWithResults = user.bets.filter(bet => bet.game.result)
      const lastBet = gameWithResults[gameWithResults.length - 1]
      
      let oddWin
      let oddLoose
      if(lastBet && lastBet.choice === lastBet.game.result) {
        switch(lastBet.choice) {
          case "1":
            oddWin = lastBet.game.home_odd;
            break;
          case "2":
            oddWin = lastBet.game.away_odd;
            break;
          default:
            oddWin = lastBet.game.draw_odd;
        }
      } else if(lastBet && lastBet.choice !== lastBet.game.result) {
        switch(lastBet.choice) {
          case "1":
            oddLoose = lastBet.game.home_odd;
            break;
          case "2":
            oddLoose = lastBet.game.away_odd;
            break;
          default:
            oddLoose = lastBet.game.draw_odd;
        }
      }
      return {
        pseudo: user.pseudo,
        oddWin,
        oddLoose,
      }
    })
  }

  get bestUserLastWeek() {
    const lastResults = this.getUserLastResult();
    return(lastResults.sort((a, b) => b.oddWin - a.oddWin)[0])
  }

  get worstUserLastWeek() {
    const lastResults = this.getUserLastResult();
    return(lastResults.sort((a, b) => b.oddLoose - a.oddLoose)[0])
  }

  get usersPseudo() { return this.users.map(user => user.pseudo) }
  get usersColor() { return this.users.map(user => hexToRgb(user.color)) }
  get usersBorderColor() { return this.users.map(user => user.color) }

  // True if at least one bet valid
  get usersMadeBets() { return this.users.some(user => new StatCalculatorUserBets({userBets: user.bets}).bets).length > 0 }

  get earningsReparition() { return (this.users.map((user) => {
    return (user.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + this.betOdd(bet) * 2
    }
    return sum
  }, 0)).toFixed(2)})) }

  get usersAvgOddLoose() { return ( this.users.map((user) => {
    return new StatCalculatorUserBets({userBets: user.bets}).averageOddLoose
  })) }

  get usersAvgOddWin() { return ( this.users.map((user) => {
    return new StatCalculatorUserBets({userBets: user.bets}).averageOddWin
  })) }

  get earningsEvolutionByUsers() {
    return this.users.map((user) => {
      return {
        label: user.pseudo,
        data: new StatCalculatorUserBets({userBets: user.bets}).tableEarnings.map((earning, index) => {
          return earning + new StatCalculatorUserBets({userBets: user.bets}).tableEarnings.slice(0, index).reduce((sum, acc) => sum + acc, 0)
          }),
        fill: false,
        backgroundColor: user.color || 'rgb(255, 99, 132)',
        borderColor: hexToRgb(user.color) || 'rgba(255, 99, 132, 0.2)',
      }
    })
  }
}