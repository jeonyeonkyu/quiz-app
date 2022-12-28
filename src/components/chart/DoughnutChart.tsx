import React from 'react'
import { Chart } from 'react-google-charts'

export const data2 = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
]

export const options = {
  title: 'My Daily Activities',
}
const DoughnutChart = ({ data }: { data: [string, number][] }) => {
  return (
    <Chart
      chartType="PieChart"
      data={[['Task', 'Hours per Day'], ...data]}
      width={'100%'}
      height={'400px'}
    />
  )
}

export default DoughnutChart
