import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from "react-loader-spinner";

import {fetchUsers} from '../../actions/userActions';
import {isWeekend} from '../../utils/isWeekend';

import BetPreview from './BetPreview';

import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';
import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets';

const WeeklyBets = ({users, fetchUsers}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
      async function fetchData() {
        await fetchUsers()
        if(isMounted) setIsLoading(false)
      }
      fetchData();
      return () => { isMounted = false };
  }, [])

  const renderBestUser = () => {
    const bestUser = new StatCalculatorUsers({users: users}).bestUserLastWeek
    if(bestUser) {
      return <>Bravo <b>{bestUser.pseudo}</b> avec sa côte à <b>{bestUser.oddWin}</b> qui passe. #GrosseCote #GrosGain #GrosRespect comme on dit</>
    } else {
      return <>Franchement les gars ? Pas un seul capable de passer un paris ? Et ben cette app porte bien son nom !</> 
    }
  }

  const renderWorstUser = () => {
    const worstUser = new StatCalculatorUsers({users: users}).worstUserLastWeek
    if(worstUser) {
      return <><b>{worstUser.pseudo}</b>, sérieusement, rater une côte à <b>{worstUser.oddWin}</b> ? En vrai c'était pas si simple, bien joué l'artiste.</>
    } else {
      return <>Pas de looser par ici, ça fait péter la banque</> 
    }
  }

  const statsLastWeek = () => {

    return (
      <>
        <div className="text-center card-bet">
          <p className="mb-1"><b>🏆 Le champion de la semaine dernière</b></p>
          {renderBestUser()}
        </div>
        <div className="text-center card-bet">
          <p className="mb-1"><b>⛔ Le zéro de la semaine de la semaine dernière</b></p>
          {renderWorstUser()}
        </div>
      </>
    )
  }
  const betsWeek = users.map(user => {
    const statCalculatorUserBets = new StatCalculatorUserBets({userBets: user.bets})
    return {
      bet: statCalculatorUserBets.currentBet,
      user: user
    }
  })

  const renderUsers = users.map(user => {
    if(!isWeekend()) {
      if(user.bets.some(bet => !bet.game.result)) {
        return(
          <div key={user._id} className="card-bet green"><FontAwesomeIcon icon={faCheck} className='mr-1' />{user.pseudo}</div>
        )
      } else {
        return(
          <div key={user._id} className="card-bet red" ><FontAwesomeIcon icon={faTimes} className='mr-1'/>{user.pseudo}</div>
        )
      }
    }
  })

  const renderBets = betsWeek.map(({bet, user}) => {
    if(bet) {
      return (
        <React.Fragment key={bet._id}>
          <h3>{user.pseudo}</h3>
          <BetPreview bet={bet} game={bet.game}/>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment key={user._id}>
          <h3>{user.pseudo}</h3>
          <div className="text-comment text-center">Il n'a pas encore fait son pari, ce feignant !</div>
        </React.Fragment>
      )
    }
  })

  const renderWeekBets = () => {
    if(isLoading) {
      return (
        <div className="container-center margin-auto">
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
    <div className="container-center inherit-min-height">
      <h1>Les paris de la semaine</h1>
      {!isWeekend() ? statsLastWeek() : null}
      {renderWeekBets()}
    </div>
  )
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}

export default connect(mapStateToProps, {fetchUsers})(WeeklyBets)
