import React from 'react'

const Game = (props) => {
  return (
    <div className='card-game'>
      <div className="card-game-home">
        {props.home_team}
        {props.home_odd}
      </div>
      <div className="card-game-draw">
        Nul
        {props.draw_odd}
      </div>
      <div className="card-game-home">
        {props.away_team}
        {props.away_odd}
      </div>
    </div>
  )
}

export default Game
