import React from 'react'

const GameOdd = (props) => {
  return (
    <div className="card-odd">
      <div className="card-odd-detail">
        <span>{props.home_team}</span>
        <span>{props.home_odd}</span>
      </div>
      <div className="card-odd-detail">
        <span>Nul</span>
        <span>{props.draw_odd}</span>
      </div>
      <div className="card-odd-detail">
        <span>{props.away_team}</span>
        <span>{props.away_odd}</span>
      </div>
    </div>
  )
}

export default GameOdd
