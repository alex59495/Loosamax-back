const GameResult = ({game}) => {
  return (
      <div className="card-result text-center">
          <span>{game.home_score}</span>
          <span>-</span>
          <span>{game.away_score}</span>
      </div>
  )
}

export default GameResult