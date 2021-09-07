import React from 'react';
import { Radar } from 'react-chartjs-2';

import StatCalculation from '../../utils/statCalculation';

const RadarGraph = ({title, users, avgType}) => {

  const statCalculation = new StatCalculation({users})

  const data = {
    labels: statCalculation.usersPseudo(),
    datasets: [
      {
        label: title,
        data: statCalculation[avgType](),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };
  

  return (
    <div style={{height: "300", width: "300"}}>
      <h3 className='text-center'>{title}</h3>
      <Radar data={data} options={options} />
    </div>
  )
}

export default RadarGraph;