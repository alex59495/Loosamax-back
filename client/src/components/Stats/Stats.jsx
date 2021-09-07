import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

import UserStats from './UserStats';
import DoughnutGraph from './DoughnutGraph';
import RadarGraph from './RadarGraph';

import {fetchUsers} from '../../actions/userActions';

const GlobalStats = ({users, fetchUsers}) => {
  
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

  const renderStatPerUser = () => {
    if(isLoading) {
      return(
        <div className="container-center" style={{height: "100vh", width: "100%"}}>
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      )
    } else {
      return users.map(user => {
        return (
          <UserStats key={user._id} user={user}/>
        )
      })
    }
  }

  return (
    <div className="container-center">
      <h1>Les Stats des champions</h1>
      {renderStatPerUser()}
      <div className="grid_wrap">
        <DoughnutGraph users={users}/>
        <RadarGraph title="Moyenne côtes réussies" users={users} avgType="usersAvgOddWin"/>
        <RadarGraph title="Moyenne côtes ratées" users={users} avgType="usersAvgOddLoose"/>
      </div>
    </div>
  )
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}

export default connect(mapStateToProps, {fetchUsers})(GlobalStats)
