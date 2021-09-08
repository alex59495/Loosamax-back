import React from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";
import {Link} from 'react-router-dom';

// redux actions
import * as actions from '../../actions/betActions';
import BetPreview from '../Bets/BetPreview'

import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets';

const MyBet = ({user, deleteBet}) => {

  const statCalculatorUserBets = new StatCalculatorUserBets({userBets: user.bets})

  const renderMyBet = () => {
    if(!user) {
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
    } else if(!statCalculatorUserBets.currentBet)  {
      return (
        <>
          <div className="text-comment">Pas de match pour le moment, gros feignant !</div>
          <Link className='btn-risky mt-1' to='/leagues'>Voir les paris disponibles</Link>
        </>
      )
    } else {
      return (
        <div className="container-center">
          <BetPreview bet={statCalculatorUserBets.currentBet} game={statCalculatorUserBets.currentBet.game}/>
          <button className="btn-risky" onClick={() => deleteBet(statCalculatorUserBets.currentBet._id)}>Supprimer</button>
        </div>
      )
    }
  };

  return (
    <div className="container-center mt-1">
      <h3 className="text-center">Ton Pari de cette semaine</h3>
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
