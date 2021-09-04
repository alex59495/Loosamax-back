import {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

import BetPreview from './BetPreview';

import {fetchWeekBets} from '../../actions/betActions';

const OldUserBets = ({bets, fetchWeekBets}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await fetchWeekBets()
      setIsLoading(false)
    }
    fetchData();
  }, [])

  const renderBets = () => {
    if(isLoading) {
      return(
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )
    } else {
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

const mapStateToProsp = ({bets}) => {
  return {
    bets
  }
}

export default connect(mapStateToProsp, {fetchWeekBets})(OldUserBets);
