import React from 'react';
import {connect} from 'react-redux';

import UserStats from './UserStats';

import * as actions from '../../actions/betActions';

const GlobalStats = ({users}) => {
  const renderStatPerUser = users.map(user => {
    return (
      <UserStats key={user._id} user={user}/>
    )
  })

  const renderStats = () => {
    return (
      <div>
        {renderStatPerUser}
      </div>
    )
  }

  return (
    <div className="container-center">
      <h1>Les Stats des champions</h1>
      {renderStats()}
    </div>
  )
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}

export default connect(mapStateToProps, actions)(GlobalStats)
