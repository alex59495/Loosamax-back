import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Profile from './Profile/Profile';
import ListLeagues from './Games/ListLeagues';
import ListGames from './Games/ListGames';
import Home from './Home';
import WeeklyBets from './Bets/WeeklyBets';
import Stats from './Stats/Stats';
import OldUserBets from './Bets/OldUserBets';
import NoMatch from './NoMatch';

import Loader from "react-loader-spinner";

// Redux functions
import {fetchUser} from '../actions/userActions';

// utils
import {LEAGUES} from '../constants/leagues';

const App = ({fetchUser}) => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
      async function fetchData() {
        await fetchUser()
        if(isMounted) setIsLoading(false)
      }
      fetchData();
      return () => { isMounted = false };
  }, [])

  const renderLeagues = LEAGUES.map(({name}) => {
    return <Route exact path={`/games/${name}`} key={name} render={(props) => <ListGames {...props} league={`${name}`} />} />
  });

  const renderApp = () => {
    if (isLoading) {
      return (
        <div className="container-center inherit-min-height justify-content-center">
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
        <BrowserRouter>
          <>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/weekbets" component={WeeklyBets} />
                <Route exact path="/mesparis" component={OldUserBets} />
                <Route exact path="/stats" component={Stats} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/leagues" component={ListLeagues} />
                {renderLeagues}
                <Route component={NoMatch} status={404}/>
              </Switch>
            </div>
          </>
        </BrowserRouter>
      )
    }
  }

  return (
    <>
      {renderApp()}
    </>
  )
}

export default connect(null, {fetchUser})(App)
