import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import  * as actions from '../../actions/betActions';
import BetPreview from '../Bets/BetPreview'


const Stats = ({bets, fetchBets, user}) => {

  useEffect(() => {
    if (user._id) {
      fetchBets(user._id)
    }
  }, [user])

  const renderBets = (bets) => {
    if (bets.length > 0) {
      return bets.map((bet) => {
        return (
          <div key={bet._id}>
            <BetPreview bet={bet} />
          </div>
        )
      })
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <div>
      {renderBets(bets)}
    </div>
  )
}

const mapStateToProps = ({bets, user}) => {
  return {
    bets,
    user
  }
}

export default connect(mapStateToProps, actions)(Stats)
