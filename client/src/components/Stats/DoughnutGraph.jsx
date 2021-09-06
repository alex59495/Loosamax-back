import { Doughnut } from 'react-chartjs-2';

const DoughnutGraph = ({users}) => {
  const data = {
    labels: users.map(user => user.pseudo),
    datasets: [
      {
        label: 'Reparitition des gains',
        data: users.map((user) => {
          return (user.bets.reduce((sum, bet) => {
          if (bet.game.result === bet.choice) {
            return sum + bet.odd * 2
          }
          return sum
        }, 0)).toFixed(2)}),
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