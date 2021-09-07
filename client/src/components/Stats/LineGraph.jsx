import { Line } from 'react-chartjs-2';
import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';

const LineChart = ({users}) => {
  
  const statCalculatorUsers = new StatCalculatorUsers({users})
  const data = {
    labels: Array.from({length: users[0].bets.length}, (_, i) => i + 1),
    datasets: statCalculatorUsers.earningsEvolutionByUsers,
  };

  return (
    <div style={{width: "100%"}}>
      <h3 className='text-center'>Evolution des bénéfices</h3>
      <Line data={data} />
    </div>
  )
}

export default LineChart;