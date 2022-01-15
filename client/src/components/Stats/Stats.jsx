import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

import UserStats from './UserStats';
import DoughnutGraph from './DoughnutGraph';
import RadarGraph from './RadarGraph';
import LineGraph from './LineGraph';

import {fetchUsers} from '../../actions/userActions';
import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';
import UsersSorted from '../../utils/stats/usersSorted';

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

  const usersSorted = new UsersSorted(users).sorted();

  const renderIcon = (index) => {
    if(index === 0) {
      return <>👑</>
    } else if(index === users.length - 1) {
      return <>💩</>
    }
  }

  const renderRanking = () => {
    return usersSorted.map((user, index) => {
      return (
        <tr key={user._id}>
          <th>{index + 1}.</th>
          <td className='start'>{renderIcon(index)} {user.pseudo}</td>
        </tr>
      )
    })
  }

  const renderStatPerUser = () => {
    return usersSorted.map(user => {
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
          <h1>Les Stats des champions</h1>
          <table className="table max-width-300 bg-white opacity-80">
            <thead>
                <tr>
                  <th colSpan="2">Le classement</th>
                </tr>
            </thead>
            <tbody>
              {renderRanking()}
            </tbody>
          </table>
          <h2>Les stats en détails</h2>
          {renderStatPerUser()}
          <h3>Graphs</h3>
          {renderStatsGraph()}
        </>
      )
    }
  }

  return (
    <div className="container-center inherit-min-height">
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
