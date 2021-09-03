import BandResult from './BandResult';
import { formatDate } from '../../utils/textTransformation';

const BetPreview = ({bet}) => {

  const oddRisk = (oddValue) => {
    if (oddValue > 2.5) { return "risk" }
    else if (oddValue < 2) { return "safe" }
    else { return "intermediate" }
  }

  const result = (betResult) => {
    if (betResult === null) return;
    if (betResult === "win") {
      return <BandResult result="Winner"/>
    } else {
      return <BandResult result="Looser"/>
    }
  }
  return (
    <div className="card-odd">
      <div className="match">
        <div className={`card-odd-detail ${bet.choice === 1 ? 'active-odd' : null}`}>
          <span className="team">{bet.game.home_team}</span>
          <span className={oddRisk(bet.game.home_odd)}>{bet.game.home_odd}</span>
        </div>
        <div className={`card-odd-detail ${bet.choice === 0 ? 'active-odd' : null}`}>
          <span>Nul</span>
          <span className={oddRisk(bet.game.draw_odd)}>{bet.game.draw_odd}</span>
        </div>
        <div className={`card-odd-detail ${bet.choice === 2 ? 'active-odd' : null}`}>
          <span className="team">{bet.game.away_team}</span>
          <span className={oddRisk(bet.game.away_odd)}>{bet.game.away_odd}</span>
        </div>
      </div>
      <div className="date">{formatDate(bet.game.commence_time)}</div>
    </div>
  )
}

export default BetPreview