import React from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

// redux actions
import * as actions from '../../actions/betActions';
import BetPreview from '../Bets/BetPreview'

const MyBet = ({user, deleteBet}) => {

  const renderMyBet = () => {
    if(!user || !user.actualBet) {
      return (
        <div className="container-center" style={{height: "100%", width: "100%"}}>
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      )
    } else if(user.actualBet && !user.actualBet.game)  {
      return 'Pas de match pour le moment'
    } else {
      return (
        <div className="container-center">
          <BetPreview bet={user.actualBet} game={user.actualBet.game}/>
          <button className="btn-risky" onClick={() => deleteBet(user.actualBet._id)}>Supprimer</button>
        </div>
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
