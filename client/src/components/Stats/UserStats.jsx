import React from 'react'
import {connect} from 'react-redux';

const UserStats = ({user}) => {

  const bets = user.bets.filter(bet => bet.game.result)

  const colorResult = (result) => {
    if(result < 33) { return 'risky' }
    if(result < 66) { return 'intermediate' }
    return 'safe'
  }

  const renderStats = (bets) => {

    if (bets.length > 0) {
      return (
        <>
          <div className="d-flex justify-content-center">
            <div className="card-stat">
              <div className="title">Perdu</div>
              <div className="content">{numberLoose}</div>
            </div>
            <div className="card-stat">
              <div className="title">Gagné</div>
              <div className="content">{numberWin}</div>
            </div>
            <div className="card-stat">
              <div className="title">Pourcentage Gagné</div>
              <div className={`content ${colorResult(winPourcentage)}`}>{winPourcentage}%</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte réussie</div>
              <div className="content">{averageOddWin}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte ratée</div>
              <div className="content">{averageOddLoose}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte tentée</div>
              <div className="content">{averageOdd}</div>
            </div>
            <div className="card-stat">
              <div className="title">Somme des gains</div>
              <div className="content">{sumEarnings}</div>
            </div>
          </div>
        </>
      )
    } else {
      return <h1 className="container-center">Pas de paris</h1>
    }
  }

  const numberBets = bets.length
  const numberLoose = bets.filter(bet => bet.game.result !== bet.choice).length
  const numberWin = bets.filter(bet => bet.game.result === bet.choice).length

  const averageOddWin = (bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + bet.odd
    }
    return sum
  }, 0) / numberWin).toFixed(2)

  const averageOddLoose = (bets.reduce((sum, bet) => {
    if (bet.game.result !== bet.choice) {
      return sum + bet.odd
    }
    return sum
  }, 0) / numberLoose).toFixed(2)

  const averageOdd = (bets.reduce((sum, bet) => {
    return sum + bet.odd
  }, 0) / numberBets).toFixed(2)

  const winPourcentage = (numberWin / numberBets)*100

  const sumEarnings = (bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + bet.odd * 2
    }
    return sum
  }, 0)).toFixed(2)

  return (
    <div className="container-center">
      <h3>{user.pseudo}</h3>
      {renderStats(bets)}
    </div>
  )
}

export default connect(null)(UserStats)
