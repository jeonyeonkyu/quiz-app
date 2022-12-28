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
    isSuccess,
    setSuccess,
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
      isSuccess: state.isSuccess,
      setSuccess: state.setSuccess,
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
    isSuccess,
    setSuccess,
  }
}

export default useQuiz
