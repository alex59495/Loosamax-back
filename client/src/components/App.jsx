import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Profile from './Profile';

// Redux functions
// import * as actions from '../actions'
import * as actions from '../actions'

const App = (props) => {

  useEffect(() => {
    props.fetchUser()
  }, [])

  return (
    <div className='container test-background'>
      <BrowserRouter>
        <>
          <Header />
          <Route exact path="/profile/:id" component={Profile} />
        </>
      </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
