import React from 'react';

const LeagueStanding = ({leagueStanding}) => {
  const renderLeagueStanding = () => {
    if(leagueStanding) {
      return leagueStanding.map(data => {
        return(
          <tr key={data.position}>
            <td className='text-center'>{data.position}.</td>
            <td>{data.team.name}</td>
            <td className='text-center'>{data.playedGames}</td>
            <td className='text-center'>{data.won}</td>
            <td className='text-center'>{data.draw}</td>
            <td className='text-center'>{data.lost}</td>
            <td className='text-center'>{data.points}</td>
            <td className='text-center'>{data.goalsFor}</td>
            <td className='text-center'>{data.goalsAgainst}</td>
            <td className='text-center'>{data.goalDifference}</td>
          </tr>
        )
      })
    }
  }

  const renderElement = () => {
    if(leagueStanding && leagueStanding.length > 0) {
      const lastTeam = leagueStanding[leagueStanding.length - 1].team.name

      return(
        <div className="container-center">
        <p className="text-comment text-center">Allez on va t'aider avec un petit classement actuel ! (ça sent la victoire de <b>{lastTeam}</b> ce we)</p>
        <table className="table bg-white opacity-80">
          <thead>
            <tr>
              <th></th>
              <th>Equipe</th>
              <th>Matchs</th>
              <th>V</th>
              <th>N</th>
              <th>D</th>
              <th>Points</th>
              <th>BP</th>
              <th>BC</th>
              <th>Diff</th>
            </tr>
          </thead>
          <tbody>
            {renderLeagueStanding()}
          </tbody>
        </table>
      </div>
      )
    }
  }

  return (
    <>
      {renderElement()}
    </>
  )
}

export default (LeagueStanding)
