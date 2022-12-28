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
    isSuccess,
  } = useQuiz()

  const handleChecked = useCallback((index: number) => {
    setCheckedAnswer(index)
  }, [])

  const handleClickNextButton = useCallback(() => {
    setNextQuiz()
  }, [])

  if (loading) return <>loading...</>
  if (hasError) return <>Error</>
  if (isSuccess) return <SuccessBox />
  return (
    <>
      {quizzes.length && (
        <QuizBox
          {...{
            quizzes,
            currentQuizIndex,
            handleChecked,
            handleClickNextButton,
            hasCorrectAnswers,
          }}
        />
      )}
    </>
  )
}

export default QuizContainer
