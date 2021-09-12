import React from 'react';
import { Radar } from 'react-chartjs-2';

import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';

const RadarGraph = ({title, users, avgType}) => {

  const statCalculatorUsers = new StatCalculatorUsers({users})

  const data = {
    labels: statCalculatorUsers.usersPseudo,
    datasets: [
      {
        label: title,
        data: statCalculatorUsers[avgType],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
            display: false
        },
        suggestedMin: 0,
        suggestedMax: 2.2
      }
    },
  };
  

  return (
    <div className='card-graph w-300-px'>
      <h3 className='text-center'>{title}</h3>
      <Radar data={data} options={options} />
    </div>
  )
}

export default RadarGraph;