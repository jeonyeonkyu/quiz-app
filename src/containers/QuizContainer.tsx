import React, { useCallback } from 'react'
import QuizBox from '../components/quiz/QuizBox'
import useQuiz from '../hooks/useQuiz'

const QuizContainer = () => {
  const {
    quizzes,
    currentQuizIndex,
    loading,
    hasError,
    setCheckedAnswer,
    setNextQuiz,
  } = useQuiz()

  const handleChecked = useCallback((index: number) => {
    setCheckedAnswer(index)
  }, [])

  const handleClickNextButton = useCallback(() => {
    setNextQuiz()
  }, [])

  if (loading) return <>loading...</>
  if (hasError) return <>Error</>
  return (
    <>
      {quizzes.length && (
        <QuizBox
          {...{
            quizzes,
            currentQuizIndex,
            handleChecked,
            handleClickNextButton,
          }}
        />
      )}
    </>
  )
}

export default QuizContainer
