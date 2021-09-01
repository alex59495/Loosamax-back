import React from 'react'

const GameOdd = (props) => {

  const oddRisk = (oddValue) => {
    if (oddValue > 2.5) { return "risk" }
    else if (oddValue < 2) { return "safe" }
    else { return "intermediate" }
  }

  return (
    <div className="card-odd">
      <div className="card-odd-detail">
        <span className="team">{props.home_team}</span>
        <span className={oddRisk(props.home_odd)}>{props.home_odd}</span>
      </div>
      <div className="card-odd-detail">
        <span>Nul</span>
        <span className={oddRisk(props.draw_odd)}>{props.draw_odd}</span>
      </div>
      <div className="card-odd-detail">
        <span className="team">{props.away_team}</span>
        <span className={oddRisk(props.away_odd)}>{props.away_odd}</span>
      </div>
    </div>
  )
}

export default GameOdd
