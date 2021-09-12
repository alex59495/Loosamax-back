import React from 'react'
import {connect} from 'react-redux';

import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets';

const UserStats = ({user}) => {

  const statCalculatorUserBets = new StatCalculatorUserBets({userBets: user.bets})

  const colorResultPourcentage = (result) => {
    if(result < 33) { return 'risky' }
    if(result < 66) { return 'intermediate' }
    return 'safe'
  }

  const colorResultEarning = (result) => {
    if(result < 0 ) { return 'risky' }
    if(result > 0) { return 'safe' }
    return 'intermediate'
  }

  const winPoucentage = statCalculatorUserBets.winPourcentage

  const globalEarning = statCalculatorUserBets.globalEarning

  const renderStats = (bets) => {

    if (statCalculatorUserBets.bets.length > 0) {
      return (
        <>
          <div className="d-flex justify-content-center">
            <div className="card-stat">
              <div className="title">Gagné</div>
              <div className="content">{statCalculatorUserBets.numberWin}</div>
            </div>
            <div className="card-stat">
              <div className="title">Perdu</div>
              <div className="content">{statCalculatorUserBets.numberLoose}</div>
            </div>
            <div className="card-stat">
              <div className="title">Pourcentage Gagné</div>
              <div className={`content ${colorResultPourcentage(winPoucentage)}`}>{winPoucentage}%</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte réussie</div>
              <div className="content">{statCalculatorUserBets.averageOddWin}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte ratée</div>
              <div className="content">{statCalculatorUserBets.averageOddLoose}</div>
            </div>
            <div className="card-stat">
              <div className="title">Moyenne côte tentée</div>
              <div className="content">{statCalculatorUserBets.averageOdd}</div>
            </div>
            <div className="card-stat">
              <div className="title">Gain global</div>
              <div className={`content ${colorResultEarning(globalEarning)}`}>{globalEarning}€</div>
            </div>

          </div>
        </>
      )
    } else {
      return <p className="text-comment">Pas encore de paris...</p>
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
