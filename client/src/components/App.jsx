import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Profile from './Profile';
import ListLeagues from './Games/ListLeagues';
import ListGames from './Games/ListGames';

// Redux functions
import * as actions from '../actions/userActions';

// utils
import {LEAGUES} from '../constants/leagues';


const App = (props) => {

  useEffect(() => {
    props.fetchUser()
  }, [])

  const renderLeagues = LEAGUES.map(({name}) => {
    return <Route exact path={`/games/${name}`} key={name} render={(props) => <ListGames {...props} league={`${name}`} />} />
  });

  return (
    <div className='background'>
      <BrowserRouter>
        <>
          <Header />
          <div className="container">
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/games" component={ListLeagues} />
            {renderLeagues}
          </div>
        </>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
