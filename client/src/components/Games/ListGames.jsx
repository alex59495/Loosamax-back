import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/gamesActions';

import Game from './Game';

const ListGames = ({league ,fetchGames, games}) => {

  useEffect(() => {
    fetchGames(league)
  }, [])

  const renderGames = () => {
    if(!games.hasOwnProperty(league)) {return null}

    return games[league].map(game => {
      return (
        <Game
          key={game._id}
          home_team={game.home_team}
          away_team={game.away_team}
          commence_time={game.commence_time}
          away_odd={game.away_odd}
          home_odd={game.home_odd}
          draw_odd={game.draw_odd}
        />)
    })
  }

  return (
    <div>
      {renderGames()}
    </div>
  )
}

const mapStateToProps = ({games}) => {
  return {
    games
  }
}

export default connect(mapStateToProps, actions)(ListGames);
