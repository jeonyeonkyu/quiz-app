import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const defaultData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(115, 175, 85, 0.2)',
        'rgba(208, 96, 121, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(115, 175, 85, 1)',
        'rgba(208, 96, 121, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const DoughnutChart = ({
  labels,
  label,
  data,
}: {
  labels: string[]
  label: string
  data: number[]
}) => {
  const doughnutData = { ...defaultData }
  if (labels) {
    doughnutData.labels = labels
  }
  if (label) {
    doughnutData.datasets[0].label = label
  }
  if (data) {
    doughnutData.datasets[0].data = data
  }

  return <Doughnut data={doughnutData} />
}

export default DoughnutChart
