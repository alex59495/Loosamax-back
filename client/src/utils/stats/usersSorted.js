import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets'; 
import { isWeekend } from '../isWeekend';
export default class UsersSorted {
  constructor(users) {
    this.users = users
  }

  usersSortedLive(paramSort) {
    return this.users.sort((userA, userB) => {
      return new StatCalculatorUserBets({userBets: userB.bets})[`${paramSort}`] - new StatCalculatorUserBets({userBets: userA.bets})[`${paramSort}`] 
    });
  }

  get usersSortedLastWeek() {
    const usersOrdered = this.usersLastWeekBets(this.users).sort((userA, userB) => {
      return new StatCalculatorUserBets({userBets: userB.bets}).globalEarning - new StatCalculatorUserBets({userBets: userA.bets}).globalEarning 
    });

    // Pour chaque utilisateurs, après avoir ordonner on vient remmetre le dernier paris si nécessaire
    return usersOrdered.map(user => {
      return {...user, bets: this.users.find(u => u._id === user._id).bets }
    });
  }

  usersLastWeekBets(users) {
    return users.map(user => {
      const betsLength = user.bets.length;
      const today = new Date();
      const dateMinus3Days = today.setDate(today.getDate() + 1);
      if (user.bets[betsLength - 1] && user.bets[betsLength -1].game.result && (new Date (user.bets[betsLength -1].game.commence_time) < dateMinus3Days) && isWeekend()) {
        const withoutLastBet = user.bets.slice(0, -1);
        return { ...user, bets: withoutLastBet };
      };

      return { ...user };
    })
  }

  get sortedLastWeek() {
    return this.usersSortedLastWeek
  }

  sortedLive(paramsSort) {
    return this.usersSortedLive(paramsSort)
  }
}