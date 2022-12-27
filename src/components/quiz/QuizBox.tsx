import styled from '@emotion/styled'
import React from 'react'
import { UserQuiz } from '../../api/quizTypes'

type Props = {
  quizs: UserQuiz[]
}

const QuizBox = ({ quizs }: Props) => {
  return <QuizBoxWrapper></QuizBoxWrapper>
}

const QuizBoxWrapper = styled.div`
  padding: 16px;
  border: 1px solid black;
  border-radius: 8px;
`
export default QuizBox
