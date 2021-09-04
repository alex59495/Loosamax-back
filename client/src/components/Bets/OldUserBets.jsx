import {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

import BetPreview from './BetPreview';

import {fetchUserBets} from '../../actions/betActions';

const OldUserBets = ({user, bets, fetchUserBets}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    if (user._id) {
      async function fetchData() {
        await fetchUserBets(user._id)
        if(isMounted) setIsLoading(false)
      }
      fetchData();
    }
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

const mapStateToProsp = ({user, bets}) => {
  return {
    user,
    bets
  }
}

export default connect(mapStateToProsp, {fetchUserBets})(OldUserBets);
