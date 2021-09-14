const leaguesIdentifiers = require('../../../helpers/leaguesIdentifiers');

function addDaysToDate(date, days){
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

export const games = {
  ligue_1: [
    {
      _id: "1",
      home_team: "PSG",
      away_team: "Lorient",
      home_odd: 1.2,
      draw_odd: 4,
      away_odd: 12,
      commence_time: addDaysToDate(new Date(), 3),
      result: null,
      away_score: null,
      home_score: null,
      sport_key: leaguesIdentifiers['ligue_1'].name,
    },
    {
      _id: "2",
      home_team: "Lyon",
      away_team: "Marseille",
      home_odd: 1.8,
      draw_odd: 4,
      away_odd: 2,
      commence_time: addDaysToDate(new Date(), 3),
      result: null,
      away_score: null,
      home_score: null,
      sport_key: leaguesIdentifiers['ligue_1'].name,
    }
  ],
  premier_league: [
    {
      _id: "3",
      home_team: "Tottenham",
      away_team: "Manchester City",
      home_odd: 2,
      draw_odd: 3,
      away_odd: 1.8,
      commence_time: addDaysToDate(new Date(), 3),
      result: null,
      away_score: null,
      home_score: null,
      sport_key: leaguesIdentifiers['premier_league'].name,
    }
  ]
}