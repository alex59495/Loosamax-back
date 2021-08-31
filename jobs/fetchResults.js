const axios = require('axios');

 module.exports = async function(){
  const ligue1 = await axios({
    method: 'get',
    url: 'http://api.football-data.org/v2/competitions/FL1/matches?matchday=1',
    headers: {'X-Auth-Token': '81d1390d9713461e8934c940e9ede544'}
  })
  const bundesliga = await axios({
    method: 'get',
    url: 'http://api.football-data.org/v2/competitions/BL1/matches?matchday=1',
    headers: {'X-Auth-Token': '81d1390d9713461e8934c940e9ede544'}
  })
  const matchsData = [...ligue1.data.matches, ...bundesliga.data.matches].map(({awayTeam, homeTeam, score}) => {
    return {
      awayTeam,
      homeTeam,
      score
    }
  })
  console.log(matchsData.length)
}