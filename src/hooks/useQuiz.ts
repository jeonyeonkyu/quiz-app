import { useEffect } from 'react'
import quizStore from '../store/quizStore'

const useQuiz = () => {
  const fetch = quizStore((state) => state.fetch)
  const quizs = quizStore((state) => state.quizs)

  useEffect(() => {
    fetch()
  }, [fetch])

  return { quizs }
}

export default useQuiz
