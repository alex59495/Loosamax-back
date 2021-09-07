import { Doughnut } from 'react-chartjs-2';

import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';

const DoughnutGraph = ({users}) => {

  const statCalculatorUsers = new StatCalculatorUsers({users})

  const data = {
    labels: statCalculatorUsers.usersPseudo(),
    datasets: [
      {
        label: 'Reparitition des gains',
        data: statCalculatorUsers.earningsReparition(),
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{height: "300", width: "300"}}>
      <h3 className='text-center'>Reparitition des gains</h3>
      <Doughnut data={data} />
    </div>
  )
}

export default DoughnutGraph