import React from 'react';
import {connect} from 'react-redux';

// redux actions
import * as actions from '../../actions/betActions';
import BetPreview from '../Bets/BetPreview'

const MyBet = ({user, deleteBet}) => {

  const renderMyBet = () => {
    if(!user || !user.actualBet) {
      return 'Loading...'
    } else if(user.actualBet && !user.actualBet.game)  {
      return 'Pas de match pour le moment'
    } else {
      return (
        <>
          <BetPreview bet={user.actualBet}/>
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
