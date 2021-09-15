const Game = require('../models/Game')
const User = require('../models/User')
const Bet = require('../models/Bet')
module.exports = class AutomaticChooseGameService {

  call = async () => {
    // On recupere tous les utilisateurs avec leurs games et bets
    const users = await User.find().populate({
      path: 'bets',
      populate: {
        path: 'game',
        model: 'games'
      }
    })

    // On crée un tableau des id des games déjà sélectionnés
    const gamesIdAlreadySelected = users.map(user => user.currentBet()?.game?._id)

    // On fetch les games qui n'ont pas encore de résultat dans la bdd et on les classe par la plus petite côte
    const games = (await Game.aggregate([ 
      { 
        $match: { 
          result: null, _id: { "$nin": gamesIdAlreadySelected } 
        } 
      }, 
      { 
        $project: {
          "id": 1,
          lower_odd: {
            $min: ["$away_odd", "$home_odd", "$draw_odd"]
          },
          choice: {
            $switch: {
              branches: [
                { case: { 
                  $eq: [{ $min: ["$away_odd", "$home_odd", "$draw_odd"] }, "$away_odd"]}, then: "2" },
                { case: { 
                  $eq: [{ $min: ["$away_odd", "$home_odd", "$draw_odd"] }, "$home_odd"]}, then: "1" },
                {case: { 
                  $eq: [{ $min: ["$away_odd", "$home_odd", "$draw_odd" ]}, "$draw_odd" ]}, then: "N" }
              ]
            }
          }
        }
      },
      { $sort: { lower_odd: 1 } }
    ]))


    const usersToUpdate = users.filter(user => !user.currentBet())

    await Promise.all(usersToUpdate.map(async user => {
      // On crée un bet pour les utilisateurs qui n'en ont pas encore avec la côte la plus faible
      const bet = await new Bet({
        choice: games[0].choice,
        game: games[0]._id
      })
      // On supprime du tableau le game qui a servi pour crée ce bet (puisqu'il appartient a un currentBet désormais)
      games.shift()

      // On update l'user avec ce bet
      await User.findOneAndUpdate({_id: user._id}, {$push: {"bets": bet}})
    }))
  }
}