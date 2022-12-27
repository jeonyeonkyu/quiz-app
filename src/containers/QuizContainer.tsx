import React from 'react'
import QuizBox from '../components/quiz/QuizBox'
import useQuiz from '../hooks/useQuiz'

const QuizContainer = () => {
  const { quizs } = useQuiz()

  return <QuizBox {...{ quizs }} />
}

export default QuizContainer
