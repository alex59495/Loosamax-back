module.exports = class StatCalculation {

  constructor({ bets, users}) {
    this.bets = bets
    this.users = users
  }

  usersPseudo = () => this.users.map(user => user.pseudo)

  betFinished = (bets) => bets.filter(bet => bet.game.result)

  numberBets = (bets = this.bets) => bets.length
  numberLoose = (bets = this.bets) => bets.filter(bet => bet.game.result !== bet.choice).length
  numberWin = (bets = this.bets) => bets.filter(bet => bet.game.result === bet.choice).length
  
  averageOddWin = (bets = this.bets) => (bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + bet.odd
    }
    return sum
  }, 0) / this.numberWin(bets)).toFixed(2)
  
  averageOddLoose = (bets = this.bets) => (bets.reduce((sum, bet) => {
    if (bet.game.result !== bet.choice) {
      return sum + bet.odd
    }
    return sum
  }, 0) / this.numberLoose(bets)).toFixed(2)
  
  averageOdd = (bets = this.bets) => (bets.reduce((sum, bet) => {
    return sum + bet.odd
  }, 0) / this.numberBets(bets)).toFixed(2)
  
  winPourcentage = (bets = this.bets) => (this.numberWin(bets) / this.numberBets(bets))*100
  
  sumEarnings = (bets = this.bets) => (bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + bet.odd * 2
    }
    return sum
  }, 0)).toFixed(2)

  earningsReparition = () => (this.users.map((user) => {
    return (user.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + bet.odd * 2
    }
    return sum
  }, 0)).toFixed(2)}))

  usersAvgOddLoose = () => ( this.users.map((user) => {
    return this.averageOddLoose(this.betFinished(user.bets))
  }))

  usersAvgOddWin = () => ( this.users.map((user) => {
    return this.averageOddWin(this.betFinished(user.bets))
  }))
}