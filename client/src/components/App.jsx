import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Profile from './Profile/Profile';
import Games from './Games/Games';
import ListGames from './Games/ListGames';

// Redux functions
import * as actions from '../actions/userActions';

// utils
import {LEAGUES} from '../constants/leagues';


const App = (props) => {

  useEffect(() => {
    props.fetchUser()
  }, [])

  const renderLeagues = LEAGUES.map(league => {
    return <Route exact path={`/games/${league}`} key={league} render={(props) => <ListGames {...props} league={`${league}`}/>} />
  })

  return (
    <div className='container test-background'>
      <BrowserRouter>
        <>
          <Header />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/games" component={Games} />
          {renderLeagues}
        </>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
