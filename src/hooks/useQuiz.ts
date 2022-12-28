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
    startTime,
    endTime,
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
      startTime: state.startTime,
      endTime: state.endTime,
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
    startTime,
    endTime,
  }
}

export default useQuiz
