import {connect} from 'react-redux';

import BetPreview from './BetPreview';

const OldUserBets = ({user}) => {

  const bets = user.bets ? user.bets.filter(bet => bet.game.result) : null

  const renderBets = () => {
    if (bets.length > 0) {
      return bets.map(bet => {
        return (
          <div className="mt-1" key={bet._id} >
            <BetPreview bet={bet} game={bet.game}/>
          </div>
        )
      })
    } else {
      return (
        <>
          <h3>Pas encore de paris (et donc pas encore de défaites)</h3>
          <iframe title="gif-think" src="https://giphy.com/embed/d3mlE7uhX8KFgEmY" width="480" height="264" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/culture--think-hmm-d3mlE7uhX8KFgEmY">via GIPHY</a></p>
        </>
      )
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
