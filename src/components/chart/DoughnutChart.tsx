import styled from '@emotion/styled'
import React from 'react'
import { Chart } from 'react-google-charts'

const DoughnutChart = ({ data }: { data: [string, number][] }) => {
  return (
    <ChartWrapper>
      <Chart
        chartType="PieChart"
        data={[['', ''], ...data]}
        width={'100%'}
        height={'400px'}
      />
    </ChartWrapper>
  )
}

const ChartWrapper = styled.div`
  min-width: 566px;
  min-height: 400px;
`

export default DoughnutChart
