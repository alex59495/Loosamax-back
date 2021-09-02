import React from 'react';

const Bet = ({user, game, choice}) => {

  const oddRisk = (oddValue) => {
    if (oddValue > 2.5) { return "risk" }
    else if (oddValue < 2) { return "safe" }
    else { return "intermediate" }
  }

  const renderMyBet = () => {
    return (
      <>
        <h3 className="text-center">{user.pseudo}</h3>
        <div className="card-odd">
          <div className={`card-odd-detail ${choice === 1 ? 'active-odd' : null}`}>
            <span className="team">{game.home_team}</span>
            <span className={oddRisk(game.home_odd)}>{game.home_odd}</span>
          </div>
          <div className={`card-odd-detail ${choice === 0 ? 'active-odd' : null}`}>
            <span>Nul</span>
            <span className={oddRisk(game.draw_odd)}>{game.draw_odd}</span>
          </div>
          <div className={`card-odd-detail ${choice === 2 ? 'active-odd' : null}`}>
            <span className="team">{game.away_team}</span>
            <span className={oddRisk(game.away_odd)}>{game.away_odd}</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="mb-1">
      {renderMyBet()}
    </div>
  )
}

export default Bet;
