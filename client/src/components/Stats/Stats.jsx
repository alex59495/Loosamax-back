import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

import UserStats from './UserStats';
import DoughnutGraph from './DoughnutGraph';
import RadarGraph from './RadarGraph';
import LineGraph from './LineGraph';

import {fetchUsers} from '../../actions/userActions';
import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';

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
    return users.map(user => {
      return (
        <UserStats key={user._id} user={user}/>
      )
    })
  }

  const renderStatsGraph = () => {
    const statCalculatorUsers = new StatCalculatorUsers({users})

    if (statCalculatorUsers.usersMadeBets) {
      return (
        <p className="text-comment">
          Il n'y a même pas encore de paris, t'as cru qu'on allait bosser et faire des jolis graphs ?
        </p>
      )
    } else {
      return (
        <>
          <div className="grid_wrap">
            <DoughnutGraph users={users}/>
            <RadarGraph title="Moyenne côtes réussies" users={users} avgType="usersAvgOddWin"/>
            <RadarGraph title="Moyenne côtes ratées" users={users} avgType="usersAvgOddLoose"/>
          </div>
          <LineGraph users={users}/>  
        </>
      )
    }
  }

  const renderStats = () => {
    if(isLoading){
      return(
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
          {renderStatPerUser()}
          <h3>Graphs</h3>
          {renderStatsGraph()}
        </>
      )
    }
  }

  return (
    <div className="container-center inherit-min-height">
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

export default connect(mapStateToProps, {fetchUsers})(GlobalStats)
