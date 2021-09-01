import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions/betActions';

const Game = (props) => {
  return (
    <div className='card-game'>
      <div className="card-game-home" onClick={() => props.createBet({choice: 1, team: props.home_team, game_id: props.id, user_id: props.auth._id}, props.history)}>
        {props.home_team}
        {props.home_odd}
      </div>
      <div className="card-game-draw" onClick={() => props.createBet({choice: 0, team: 'Match nul', game_id: props.id, user_id: props.auth._id}, props.history)}>
        Nul
        {props.draw_odd}
      </div>
      <div className="card-game-home" onClick={() => props.createBet({choice: 2, team: props.away_team, game_id: props.id, user_id: props.auth._id}, props.history)}>
        {props.away_team}
        {props.away_odd}
      </div>
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, actions)(withRouter(Game));
