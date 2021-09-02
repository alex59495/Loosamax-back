import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

import * as actions from '../../actions/gamesActions';

import GameOdd from './GameOdd';
import { snakeToCamel, capitalize } from '../../utils/textTransformation';

const ListGames = ({league ,fetchGames, games}) => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAsync() {    
      await fetchGames(league)
      setIsLoading(false)
    }
    fetchAsync()
  }, [])

  const renderGames = () => {
    if(!games.hasOwnProperty(league)) {return null}

    return games[league].map(game => {
      return (
        <GameOdd
          key={game._id}
          _id={game._id}
          home_team={game.home_team}
          away_team={game.away_team}
          commence_time={game.commence_time}
          away_odd={game.away_odd}
          home_odd={game.home_odd}
          draw_odd={game.draw_odd}
        />)
    })
  }

  const renderListGames = () => {
    if(isLoading) {
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
    } else {
      return (
        <div className="d-flex">
          <div className="grid_wrap">
            {renderGames()}
          </div>
        </div>
      )
    }
  }

  

  return (
    <>
      <h1 className="text-center text-orange">{capitalize(snakeToCamel(league))}</h1>
      {renderListGames()}
    </>
  )
}

const mapStateToProps = ({games}) => {
  return {
    games
  }
}

export default connect(mapStateToProps, actions)(ListGames);
