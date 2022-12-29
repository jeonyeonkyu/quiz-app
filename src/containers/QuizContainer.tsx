import React, { useCallback } from 'react'
import QuizBox from '../components/quiz/QuizBox'
import SuccessBox from '../components/quiz/SuccessBox'
import useQuiz from '../hooks/useQuiz'

const QuizContainer = () => {
  const {
    quizzes,
    hasCorrectAnswers,
    currentQuizIndex,
    loading,
    hasError,
    setCheckedAnswer,
    setNextQuiz,
    startTime,
    endTime,
  } = useQuiz()

  const handleChecked = useCallback((index: number) => {
    setCheckedAnswer(index)
  }, [])

  if (loading) return <>loading...</>
  if (hasError) return <>Error</>
  if (quizzes.length && quizzes.length === currentQuizIndex)
    return <SuccessBox {...{ startTime, endTime, hasCorrectAnswers }} />

  return (
    <>
      {quizzes.length && (
        <QuizBox
          {...{
            quizzes,
            currentQuizIndex,
            handleChecked,
            setNextQuiz,
            hasCorrectAnswers,
          }}
        />
      )}
    </>
  )
}

export default QuizContainer
