import { Line } from 'react-chartjs-2';
import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';

const LineChart = ({users}) => {
  
  const statCalculatorUsers = new StatCalculatorUsers({users})
  const data = {
    labels: Array.from({length: users[0].bets.length}, (_, i) => i + 1),
    datasets: statCalculatorUsers.earningsEvolutionByUsers,
  };

  const options = {
    scales: {
      yAxis: {
        ticks: {
          callback: function(value) {
            return value + '€'
          }
        }
      }
    },
    maintainAspectRatio: false
  }

  return (
    <div className='card-graph w-100'>
      <h3 className='text-center'>Evolution des bénéfices</h3>
      <div style={{position: "relative", height:"70vh", width:"100%"}}>
        <Line data={data} options={options} height="100%" width="100%"/>
      </div>
    </div>
  )
}

export default LineChart;