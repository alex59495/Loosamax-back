import React from 'react';
import {Link} from 'react-router-dom';

// utils
import {LEAGUES} from '../../constants/leagues';
import { snakeToCamel, capitalize } from '../../utils/textTransformation';

const ListLeagues = () => {

  const renderLeagues = LEAGUES.map(({name, country}) => {
    return (
      <div key={name} className="card-country" style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 20%), url(/${country}.png)` }}>
        <Link className="bold text-center" to={`/games/${name}`}>
          {capitalize(snakeToCamel(name))}
        </Link>
      </div>
    )
  })

  return (
    <div>
      <h1 className="text-center">Choisi ta ligue</h1>
      <div className="d-flex">
        <div className="grid_wrap">
          {renderLeagues}
        </div>
      </div>
    </div>
  )
}

export default ListLeagues
