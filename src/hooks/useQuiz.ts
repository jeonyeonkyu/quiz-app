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
    setQuizPage,
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
      setQuizPage: state.setQuizPage,
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
    setQuizPage,
  }
}

export default useQuiz
