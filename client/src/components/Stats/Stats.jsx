import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import  * as actions from '../../actions/betActions';
import BetPreview from '../Bets/BetPreview'
import Loader from "react-loader-spinner";

const Stats = ({bets, fetchBets, user}) => {

  useEffect(() => {
    if (user._id) {
      fetchBets(user._id)
    }
  }, [user])

  const renderBets = (bets) => {
      return bets.map((bet) => {
        return (
          <div key={bet._id}>
            <BetPreview bet={bet} />
          </div>
        )
      })
  }

  const renderStats = (bets) => {
    if (bets.length > 0) {
      return (
        <>
          {renderBets(bets)}
          <div className="d-flex">
            <span className="mr-5">Loose{numberLoose}</span>
            <span className="mr-5">Win{numberWin}</span>
            <span className="mr-5">Pourcentage Win{(numberWin / numberBets)*100}%</span>
            <span className="mr-5">Moyenne côte réussi{averageOddWin}</span>
            <span className="mr-5">Moyenne côte raté{averageOddLoose}</span>
            <span className="mr-5">Moyenne côte tenté{averageOdd}</span>
          </div>
        </>
      )
    } else {
      return (
        <div className="d-flex justify-content-center margin-auto" style={{height: "100%", width: "100%"}}>
          <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
        />
        </div>
      )
    }
  }

  const numberBets = bets.length
  const numberLoose = bets.filter(bet => bet.result === "loose").length
  const numberWin = bets.filter(bet => bet.result === "win").length

  const averageOddWin = (bets.reduce((sum, bet) => {
    if (bet.result === "win") {
      return sum + bet.odd
    }
    return sum
  }, 0) / numberWin).toFixed(2)

  const averageOddLoose = (bets.reduce((sum, bet) => {
    if (bet.result === "loose") {
      return sum + bet.odd
    }
    return sum
  }, 0) / numberLoose).toFixed(2)

  const averageOdd = (bets.reduce((sum, bet) => {
    return sum + bet.odd
  }, 0) / numberBets).toFixed(2)

  return (
    <>
      {renderStats(bets)}
    </>
  )
}

const mapStateToProps = ({bets, user}) => {
  return {
    bets,
    user
  }
}

export default connect(mapStateToProps, actions)(Stats)
