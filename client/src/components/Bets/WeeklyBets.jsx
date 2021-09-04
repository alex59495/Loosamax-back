import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from "react-loader-spinner";


import BetPreview from './BetPreview';

import * as actions from '../../actions/betActions';

const WeeklyBets = ({bets, users, fetchWeekBets}) => {

  const usersBetDone = bets.map(bet => bet.user._id)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function fetchAsync() {    
      await fetchWeekBets()
      if (isMounted) setIsLoading(false);
    }
    fetchAsync()
    return () => { isMounted = false };
  }, [])

  const renderUsers = users.map(user => {
    if(usersBetDone.includes(user._id)) {
      return(
        <div key={user._id} className="card-bet green"><FontAwesomeIcon icon={faCheck} className='mr-1' />{user.pseudo}</div>
      )
    } else {
      return(
        <div key={user._id} className="card-bet red" ><FontAwesomeIcon icon={faTimes} className='mr-1'/>{user.pseudo}</div>
      )
    }
  })

  const renderBets = bets.map(bet => {
    return (
      <React.Fragment key={bet._id}>
        <h3>{bet.user.pseudo}</h3>
        <BetPreview bet={bet} game={bet.game}/>
      </React.Fragment>
    )
  })

  const renderWeekBets = () => {
    if(isLoading) {
      return (
        <div className="container-center" style={{height: "100%", width: "100%"}}>
          <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
      )
    } else {
      return (
        <>
          <div className="d-flex">
            {renderUsers}
          </div>
          {renderBets}
        </>
      )
    }
  }


  return (
    <div className="container-center">
      <h1>Les paris de la semaine</h1>
      {renderWeekBets()}
    </div>
  )
}

const mapStateToProps = ({bets, users}) => {
  return {
    bets,
    users
  }
}

export default connect(mapStateToProps, actions)(WeeklyBets)
