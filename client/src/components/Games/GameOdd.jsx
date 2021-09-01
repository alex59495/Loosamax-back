import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

// Redux actions
import * as actions from '../../actions/betActions';

const GameOdd = (props) => {

  const oddRisk = (oddValue) => {
    if (oddValue > 2.5) { return "risk" }
    else if (oddValue < 2) { return "safe" }
    else { return "intermediate" }
  }

  return (
    <div className="card-odd">
      <div className="card-odd-detail" onClick={() => props.createBet({choice: 1, team: props.home_team, game_id: props.id, user_id: props.user._id}, props.history)}>
        <span className="team">{props.home_team}</span>
        <span className={oddRisk(props.home_odd)}>{props.home_odd}</span>
      </div>
      <div className="card-odd-detail" onClick={() => props.createBet({choice: 0, team: 'Match nul', game_id: props.id, user_id: props.user._id}, props.history)}>
        <span>Nul</span>
        <span className={oddRisk(props.draw_odd)}>{props.draw_odd}</span>
      </div>
      <div className="card-odd-detail" onClick={() => props.createBet({choice: 2, team: props.away_team, game_id: props.id, user_id: props.user._id}, props.history)}>
        <span className="team">{props.away_team}</span>
        <span className={oddRisk(props.away_odd)}>{props.away_odd}</span>
      </div>
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps, actions)(withRouter(GameOdd));
