import React from 'react';
import {Link} from 'react-router-dom';

// utils
import {LEAGUES} from '../../constants/leagues';
import { snakeToCamel, capitalize } from '../../utils/textTransformation';

const ListLeagues = () => {

  const renderLeagues = LEAGUES.map(league => {
    return (
      <div key={league.name} className="card-country" style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 20%), url(/${league.country}.png)` }}>
        <Link to={`/games/${league.name}`}>
          {capitalize(snakeToCamel(league.name))}
        </Link>
      </div>
    )
  })

  return (
    <div>
      <h1 className="text-center text-orange">Choisi ta ligue</h1>
      <div className="d-flex">
        <div className="grid_wrap">
          {renderLeagues}
        </div>
      </div>
    </div>
  )
}

export default ListLeagues
