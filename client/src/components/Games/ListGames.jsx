import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';

import { fetchGames } from '../../actions/gamesActions';

import BetPreview from '../Bets/BetPreview';
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
    if(!games.hasOwnProperty(league)) {
      return null
    }

    if(games[league].length === 0) {
      if ([6,7,1].includes(new Date().getDay())) {
        return <p className="text-comment">Alors comme ça on veut parier les week-end ? On aime pas les faillots ici, va falloir attendre.</p>
      }
      return <p className="text-comment">Pas encore de paris disponibles pour cette ligue jeune impétueux. Il va falloir patienter</p>
    }

    return games[league].map(game => {
      return (
        <BetPreview key={game._id} game={game} />)
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
      <div className="link">
        <Link to="/leagues">Revenir aux ligues</Link>
      </div>
      <h1 className="text-center">{capitalize(snakeToCamel(league))}</h1>
      {renderListGames()}
    </>
  )
}

const mapStateToProps = ({games}) => {
  return {
    games
  }
}

export default connect(mapStateToProps, { fetchGames })(ListGames);
