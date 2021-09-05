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
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut data={data} />
  )
}

export default DoughnutGraph