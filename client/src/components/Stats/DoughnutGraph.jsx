import { Doughnut } from 'react-chartjs-2';

import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';

const DoughnutGraph = ({users}) => {

  const statCalculatorUsers = new StatCalculatorUsers({users})

  const data = {
    labels: statCalculatorUsers.usersPseudo,
    datasets: [
      {
        label: 'Reparitition des gains',
        data: statCalculatorUsers.earningsReparition,
        backgroundColor: statCalculatorUsers.usersColor,
        borderColor: statCalculatorUsers.usersBorderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='card-graph w-300-px'>
      <h3 className='text-center'>Reparitition des gains</h3>
      <Doughnut data={data} />
    </div>
  )
}

export default DoughnutGraph