import { useEffect } from 'react'
import quizStore from '../store/quizStore'
import shallow from 'zustand/shallow'

const useQuiz = () => {
  const {
    fetch,
    quizzes,
    currentQuizIndex,
    loading,
    hasError,
    setCheckedAnswer,
    setNextQuiz,
  } = quizStore(
    (state) => ({
      fetch: state.fetch,
      quizzes: state.quizzes,
      currentQuizIndex: state.currentQuizIndex,
      loading: state.loading,
      hasError: state.hasError,
      setCheckedAnswer: state.setCheckedAnswer,
      setNextQuiz: state.setNextQuiz,
    }),
    shallow
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    quizzes,
    currentQuizIndex,
    loading,
    hasError,
    setCheckedAnswer,
    setNextQuiz,
  }
}

export default useQuiz
