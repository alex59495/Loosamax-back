import React from 'react';
import {Link} from 'react-router-dom';

// utils
import {LEAGUES} from '../../constants/leagues';
import { snakeToCamel } from '../../utils/snakeToCamel';

const ListLeagues = () => {
  const renderLeagues = LEAGUES.map(league => {
    return <li key={league}><Link to={`/games/${league}`}>{snakeToCamel(league)}</Link></li>
  })

  return (
    <div>
      <h1>Choisi ta ligue</h1>
      <ul>
        {renderLeagues}
      </ul>
    </div>
  )
}

export default ListLeagues
