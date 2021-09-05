import {connect} from 'react-redux';

import BetPreview from './BetPreview';

const OldUserBets = ({user}) => {

  const bets = user.bets ? user.bets.filter(bet => bet.game.result) : null

  const renderBets = () => {
    if (bets) {
      return bets.map(bet => {
        return (
          <div className="mt-1" key={bet._id} >
            <BetPreview bet={bet} game={bet.game}/>
          </div>
        )
      })
    }
  }

  return (
    <div className="container-center">
      <h1>Mes paris</h1>
      {renderBets()}
    </div>
  )
};

const mapStateToProsp = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProsp)(OldUserBets);
