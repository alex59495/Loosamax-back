import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import UserStats from './UserStats';
import DoughnutGraph from './DoughnutGraph';
import RadarGraph from './RadarGraph';
import LineGraph from './LineGraph';

import {fetchYears} from '../../actions/seasonActions';
import {fetchUsers} from '../../actions/userActions';
import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';
import UsersSorted from '../../utils/stats/usersSorted';

const GlobalStats = ({users, fetchUsers, fetchYears, years}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [paramsSorted, setParamsSorted] = useState("globalEarning");
  const [selectedYear, setSelectedYear] = useState("actual");

  useEffect(() => {
    let isMounted = true
      async function fetchData() {
        setIsLoading(true)
        await fetchYears()
        await fetchUsers(selectedYear)
        if(isMounted) setIsLoading(false)
      }
       fetchData();
      return () => { isMounted = false };
  }, [selectedYear])

  const changeParamsSorted = (value) => {
    setParamsSorted(value)
  }

  const renderArrowSort = (params) => {
    if (params === paramsSorted) {
      return <FontAwesomeIcon icon={faArrowUp} size='xs'/>
    } else {
      return <FontAwesomeIcon icon={faArrowsAltV} size='xs'/>
    }
  } 

  const usersSorted = new UsersSorted(users).sortedLive(paramsSorted);

  const renderStatPerUser = () => {
    return usersSorted.map((user, index) => {
      return (
        <UserStats key={user._id} user={user} order={index + 1}/>
      )
    })
  }

  const renderStatsGraph = () => {
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

  const htmlHeadersExplanation = `
  <table class='table'>
    <thead>
      <tr>
        <th colspan="2">Stats</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>G</td>
        <td>Gagnés</td>
      </tr>
      <tr>
        <td>P</td>
        <td>Perdus</td>
      </tr>
      <tr>
        <td>% G</td>
        <td>Pourcentage de match gagnés</td>
      </tr>
      <tr>
        <td>MCR</td>
        <td>Moyenne de côtes réussies</td>
      </tr>
      <tr>
        <td>MCP</td>
        <td>Moyenne de côtes perdues</td>
      </tr>
      <tr>
        <td>MCT</td>
        <td>Moyenne de côtes tentées</td>
      </tr>
      <tr>
        <td>GG</td>
        <td>Gains Globaux</td>
      </tr>
    </tbody>
  </table>
  `

  const showHeadersExplanation = () => {
    Swal.fire({
      title: `On t'explique tout`,
      confirmButtonColor: '#4c956c',
      confirmButtonText: "J'ai pigé !",
      html: htmlHeadersExplanation, 
    })
  }

  const renderStats = () => {
    const existingBets = new StatCalculatorUsers({ users }).usersMadeBets;

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
    } else if (!existingBets) {
      return (
        <div className="text-comment">
          <p>Il n'y a même pas encore de paris, t'as cru qu'on allait bosser et faire des jolis graphs ?</p>
          <p>Puis de toute façon tu vas encore être naze cette année, soit pas pressé.</p>
        </div>
      )
    } else {
      return (
        <>
          <h2>Les stats en détails</h2>
          <button className="btn-orange" onClick={() => showHeadersExplanation()}>Je ne comprends pas les colonnes</button>
          <br />
          <table className='table' style={{background: "white"}}>
            <thead>
              <tr>
                <th>Joueur</th>
                <th className="sortable" onClick={() => changeParamsSorted('numberWin')}>{renderArrowSort('numberWin')} G</th>
                <th className="sortable" onClick={() => changeParamsSorted('numberLoose')}>{renderArrowSort('numberLoose')} P</th>
                <th className="sortable" onClick={() => changeParamsSorted('winPourcentage')}>{renderArrowSort('winPourcentage')}% G</th>
                <th className="sortable" onClick={() => changeParamsSorted('averageOddWin')}>{renderArrowSort('averageOddWin')} MCR</th>
                <th className="sortable" onClick={() => changeParamsSorted('averageOddLoose')}>{renderArrowSort('averageOddLoose')} MCP</th>
                <th className="sortable" onClick={() => changeParamsSorted('averageOdd')}>{renderArrowSort('averageOdd')} MCT</th>
                <th className="sortable" onClick={() => changeParamsSorted('globalEarning')}>{renderArrowSort('globalEarning')} GG</th>
              </tr>
            </thead>
            <tbody>
              {renderStatPerUser()}
            </tbody>
          </table>
          <h3>Graphs</h3>
          {renderStatsGraph()}
        </>
      )
    }
  }

  const renderYears = () => {
    return years.map(year => {
      return <option key={year} value={year}>{year}</option>
    })
  }

  return (
    <div className="container-center inherit-min-height">
      <select name="years" id="year" onChange={(e) => setSelectedYear(e.target.value)}>
        <option value='actual'>Année en cours</option>
        {renderYears()}
      </select>
      <h1>Les Stats des champions</h1>
      {renderStats()}
    </div>
  )
}

const mapStateToProps = ({users, years}) => {
  return {
    users,
    years
  }
}

export default connect(mapStateToProps, {fetchUsers, fetchYears})(GlobalStats)
