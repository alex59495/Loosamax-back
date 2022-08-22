import React from 'react'
import {connect} from 'react-redux';

import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets';

const UserStats = ({user, order}) => {
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

  const renderIcon = (order) => {
    if(order === 1) {
      return <>👑</>
    } else if(order === 10) {
      return <>💩</>
    }
  }

  const winPoucentage = statCalculatorUserBets.winPourcentage

  const globalEarning = statCalculatorUserBets.globalEarning

  const renderStats = () => {
    if (statCalculatorUserBets.bets.length > 0) {
      return (
        <tr>
          <td>{renderIcon(order)} {user.pseudo}</td>
          <td>{statCalculatorUserBets.numberWin}</td>
          <td>{statCalculatorUserBets.numberLoose}</td>
          <td className={`content ${colorResultPourcentage(winPoucentage)}`}>{winPoucentage}</td>
          <td>{statCalculatorUserBets.averageOddWin || 'Un bon gros zéro !'}</td>
          <td>{statCalculatorUserBets.averageOddLoose || '0 défaite, champion !'}</td>
          <td>{statCalculatorUserBets.averageOdd}</td>
          <td className={`content ${colorResultEarning(globalEarning)}`}>{globalEarning}€</td>
        </tr>
      )
    } else {
      return <p className="text-comment">Pas encore de paris...</p>
    }
  }

  return (
    renderStats()
  )
}

export default connect(null)(UserStats)
