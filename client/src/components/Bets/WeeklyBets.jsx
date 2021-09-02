import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import BetPreview from './BetPreview';

import * as actions from '../../actions/betActions';

const WeeklyBets = ({bets, users, fetchWeekBets}) => {

  const usersBetDone = bets.map(bet => bet.user._id)

  useEffect(() => {
    fetchWeekBets()
  }, [])

  const renderUsers = users.map(user => {
    if(usersBetDone.includes(user._id)) {
      return(
        <div key={user._id} style={{color: 'green'}}><FontAwesomeIcon icon={faCheck} className='mr-1' />{user.pseudo}</div>
      )
    } else {
      return(
        <div key={user._id} style={{color: 'red'}} ><FontAwesomeIcon icon={faTimes} className='mr-1'/>{user.pseudo}</div>
      )
    }
  })

  const renderBets = bets.map(bet => {
    return (
      <>
        <h3>{bet.user.pseudo}</h3>
        <BetPreview bet={bet} />
      </>
    )
  })

  return (
    <div className="container-center">
      <h1>Les paris de la semaine</h1>
      {renderUsers}
      {renderBets}
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
