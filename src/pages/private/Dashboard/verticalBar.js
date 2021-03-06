import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';



const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: false,
  }
};

export default function VerticalBar({quantity}) {
  const [chart, setChart] = useState();

  useEffect(() => {
    // quantity.map((qun, i) => i)
    let lables = quantity.map(qun => qun?.product_name),
        quan = quantity.map(qun => qun?.stock),
        backgroundColor = [];

        quantity.forEach(val => {
          var randomColor = Math.floor(Math.random()*16777215).toString(16);
          backgroundColor.push('#' + randomColor);
        });

    setChart({
      labels: lables,
      datasets: [
        {
          label: 'Clear',
          data: quan,
          backgroundColor: backgroundColor,
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)',
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)',
          // ],
          borderWidth: 1,
        },
      ],
    })   

  }, [quantity])

  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  return (
    <>
      <div className='header'>
        <h1 className='title'>Product Quantity</h1>
      </div>
      <Bar data={chart} options={options} />
    </>
  )
}