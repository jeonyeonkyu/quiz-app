import { useEffect } from 'react'
import quizStore from '../store/quizStore'
import shallow from 'zustand/shallow'

const useQuiz = () => {
  const {
    fetch,
    hasCorrectAnswers,
    quizzes,
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
  } = quizStore(
    (state) => ({
      fetch: state.fetch,
      quizzes: state.quizzes,
      currentQuizIndex: state.currentQuizIndex,
      loading: state.loading,
      hasError: state.hasError,
      setCheckedAnswer: state.setCheckedAnswer,
      setNextQuiz: state.setNextQuiz,
      hasCorrectAnswers: state.hasCorrectAnswers,
      startTime: state.startTime,
      endTime: state.endTime,
      setPrevPage: state.setPrevPage,
      setQuizPage: state.setQuizPage,
      setIncorrectAnswerNotes: state.setIncorrectAnswerNotes,
      incorrectAnswerNotes: state.incorrectAnswerNotes,
    }),
    shallow
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
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
  }
}

export default useQuiz
