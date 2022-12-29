import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React, { useMemo } from 'react'
import { QuizStore } from '../../store/quizStore'
import { formatTime } from '../../utils/timeUtils'
import DoughnutChart from '../chart/DoughnutChart'

type Props = Pick<QuizStore, 'startTime' | 'endTime' | 'hasCorrectAnswers'> & {}

const SuccessBox = ({ startTime, endTime, hasCorrectAnswers }: Props) => {
  const timeTaken = useMemo(
    () =>
      formatTime(new Date(endTime).getTime() - new Date(startTime).getTime()),
    [endTime, startTime]
  )

  const correctAnswerCount = useMemo(
    () => hasCorrectAnswers.filter((isCorrect) => isCorrect).length,
    [hasCorrectAnswers]
  )

  const wrongAnswerCount = useMemo(
    () => hasCorrectAnswers.filter((isCorrect) => !isCorrect).length,
    [hasCorrectAnswers]
  )

  return (
    <>
      <Header>
        <h1>결과</h1>
      </Header>
      <SuccessBoxWrapper>
        <Time>소요시간: {timeTaken}</Time>
        <div>
          <CorrectCountWrapper>정답 {correctAnswerCount}개</CorrectCountWrapper>
          <WrongCountWrapper>오답 {wrongAnswerCount}개</WrongCountWrapper>
        </div>

        <div>
          <DoughnutChart
            data={[
              ['정답', correctAnswerCount],
              ['오답', wrongAnswerCount],
            ]}
          />
        </div>

        <Button variant="contained">오답노트</Button>
      </SuccessBoxWrapper>
    </>
  )
}

const SuccessBoxWrapper = styled.div`
  position: relative;
  padding: 16px;
  border: 1px solid #676767;
  min-width: 600px;
  max-width: 600px;
  border-radius: 8px;

  @media (max-width: 600px) {
    min-width: auto;
  }
`
const Header = styled.header``

const Time = styled.time`
  font-weight: 500;
`

const CorrectCountWrapper = styled.span`
  color: #73af55;
  font-size: 20px;
`
const WrongCountWrapper = styled.span`
  color: #d06079;
  margin-left: 16px;
  font-size: 20px;
`

export default SuccessBox
