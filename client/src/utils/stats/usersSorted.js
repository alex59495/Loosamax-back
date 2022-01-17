import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets'; 

export default class UsersSorted {
  constructor(users) {
    this.usersSortedLastWeek = this.usersLastWeekBets(users).sort((userA, userB) => {
      return new StatCalculatorUserBets({userBets: userB.bets}).globalEarning - new StatCalculatorUserBets({userBets: userA.bets}).globalEarning 
    });
    this.usersSortedLive = users.sort((userA, userB) => {
      return new StatCalculatorUserBets({userBets: userB.bets}).globalEarning - new StatCalculatorUserBets({userBets: userA.bets}).globalEarning 
    });
  }

  usersLastWeekBets(users) {
    return users.map(user => {
      const betsLength = user.bets.length;
      const today = new Date();
      const dateMinus3Days = today.setDate(today.getDate() + 1);
      if (user.bets[betsLength - 1] && user.bets[betsLength -1].game.result && new Date (user.bets[betsLength -1].game.commence_time) < dateMinus3Days) {
        const withoutLastBet = user.bets.slice(0, -1);
        return { ...user, bets: withoutLastBet };
      };

      return { ...user };
    })
  }

  get sortedLastWeek() {
    return this.usersSortedLastWeek
  }

  get sortedLive() {
    return this.usersSortedLive
  }
}