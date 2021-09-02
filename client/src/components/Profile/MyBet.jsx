import React from 'react';
import {connect} from 'react-redux';

// redux actions
import * as actions from '../../actions/betActions';

const MyBet = ({user, deleteBet}) => {
  
  const oddRisk = (oddValue) => {
    if (oddValue > 2.5) { return "risk" }
    else if (oddValue < 2) { return "safe" }
    else { return "intermediate" }
  }

  const renderMyBet = () => {
    if(!user || !user.actualBet) {
      return 'Loading...'
    } else if(user.actualBet && !user.actualBet.game)  {
      return 'Pas de match pour le moment'
    } else {
      return (
        <>
          <div className="card-odd">
            <div className={`card-odd-detail ${user.actualBet.choice === 1 ? 'active-odd' : null}`}>
              <span className="team">{user.actualBet.game.home_team}</span>
              <span className={oddRisk(user.actualBet.game.home_odd)}>{user.actualBet.game.home_odd}</span>
            </div>
            <div className={`card-odd-detail ${user.actualBet.choice === 0 ? 'active-odd' : null}`}>
              <span>Nul</span>
              <span className={oddRisk(user.actualBet.game.draw_odd)}>{user.actualBet.game.draw_odd}</span>
            </div>
            <div className={`card-odd-detail ${user.actualBet.choice === 2 ? 'active-odd' : null}`}>
              <span className="team">{user.actualBet.game.away_team}</span>
              <span className={oddRisk(user.actualBet.game.away_odd)}>{user.actualBet.game.away_odd}</span>
            </div>
          </div>
          <button onClick={() => deleteBet(user.actualBet._id)}>Supprimer</button>
        </>
      )
    }
  };

  return (
    <div className="mb-1">
      <h1>Ton Pari de cette semaine</h1>
      {renderMyBet()}
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps, actions)(MyBet);
