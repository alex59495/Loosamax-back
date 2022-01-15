import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets'; 

export default class UsersSorted {
  constructor(users) {
    this.usersSorted = users.sort((userA, userB) => {
      return new StatCalculatorUserBets({userBets: userB.bets}).globalEarning - new StatCalculatorUserBets({userBets: userA.bets}).globalEarning 
    })
  }
  sorted() {
    return this.usersSorted
  }
}