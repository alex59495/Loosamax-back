export default class StatCalculator {
  betOdd = (bet) => {
    switch (bet.choice) {
      case "N":
        return bet.game.draw_odd
      case "1":
        return bet.game.home_odd
      case "2":
        return bet.game.away_odd
      default:
        return
    }
  }
}