import React, { useCallback, useMemo } from 'react'
import IncorrectAnswerNote from '../components/quiz/ IncorrectAnswerNote'
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
    setPrevPage,
    setQuizPage,
    setIncorrectAnswerNotes,
    incorrectAnswerNotes,
  } = useQuiz()

  const handleChecked = useCallback((index: number) => {
    setCheckedAnswer(index)
  }, [])

  const setFirstPage = useCallback(() => {
    setQuizPage(0)
  }, [])

  const handleChangeAnswerNote = useCallback((e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement
    setIncorrectAnswerNotes(target.value)
  }, [])

  const incorrectAnswerNote = useMemo(
    () => incorrectAnswerNotes[currentQuizIndex],
    [currentQuizIndex, incorrectAnswerNotes]
  )

  if (loading) return <>loading...</>
  if (hasError) return <>Error</>
  if (quizzes.length && quizzes.length === currentQuizIndex)
    return (
      <SuccessBox
        {...{ startTime, endTime, hasCorrectAnswers, setFirstPage }}
      />
    )

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
            endTime,
            setPrevPage,
          }}
        />
      )}
      {endTime && (
        <IncorrectAnswerNote
          onChange={handleChangeAnswerNote}
          value={incorrectAnswerNote}
        />
      )}
    </>
  )
}

export default QuizContainer
