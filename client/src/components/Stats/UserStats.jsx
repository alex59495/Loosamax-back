import React from 'react'
import {connect} from 'react-redux';

import StatCalculation from '../../utils/statCalculation';

const UserStats = ({user}) => {

  const bets = user.bets.filter(bet => bet.game.result)

  const statCalculation = new StatCalculation({bets})

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
              <div className="content">{statCalculation.numberLoose()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Gagné</div>
              <div className="content">{statCalculation.numberWin()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Pourcentage Gagné</div>
              <div className={`content ${colorResult(statCalculation.winPourcentage())}`}>{statCalculation.winPourcentage()}%</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte réussie</div>
              <div className="content">{statCalculation.averageOddWin()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte ratée</div>
              <div className="content">{statCalculation.averageOddLoose()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte tentée</div>
              <div className="content">{statCalculation.averageOdd()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Somme des gains</div>
              <div className="content">{statCalculation.sumEarnings()}</div>
            </div>
          </div>
        </>
      )
    } else {
      return <h1 className="container-center">Pas de paris</h1>
    }
  }

  return (
    <div className="container-center">
      <h3>{user.pseudo}</h3>
      {renderStats(bets)}
    </div>
  )
}

export default connect(null)(UserStats)
