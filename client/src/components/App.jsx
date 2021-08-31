import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Profile from './Profile';
import GamesFR from './Games/GamesFR';

// Redux functions
// import * as actions from '../actions'
import * as actions from '../actions/userActions'

const App = (props) => {

  useEffect(() => {
    props.fetchUser()
  }, [])

  return (
    <div className='container'>
      <BrowserRouter>
        <>
          <Header />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/games/ligue1" component={GamesFR} />
        </>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
