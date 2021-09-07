import React from 'react'
import {connect} from 'react-redux';

import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets';

const UserStats = ({user}) => {

  const statCalculatorUserBets = new StatCalculatorUserBets({userBets: user.bets})

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
              <div className="content">{statCalculatorUserBets.numberLoose()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Gagné</div>
              <div className="content">{statCalculatorUserBets.numberWin()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Pourcentage Gagné</div>
              <div className={`content ${colorResult(statCalculatorUserBets.winPourcentage())}`}>{statCalculatorUserBets.winPourcentage()}%</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte réussie</div>
              <div className="content">{statCalculatorUserBets.averageOddWin()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte ratée</div>
              <div className="content">{statCalculatorUserBets.averageOddLoose()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte tentée</div>
              <div className="content">{statCalculatorUserBets.averageOdd()}</div>
            </div>
            <div className="card-stat">
              <div className="title">Somme des gains</div>
              <div className="content">{statCalculatorUserBets.sumEarnings()}</div>
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
      {renderStats(user.bets)}
    </div>
  )
}

export default connect(null)(UserStats)
