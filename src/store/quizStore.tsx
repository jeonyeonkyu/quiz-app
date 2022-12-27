import create from 'zustand'
import { getQuiz } from '../api/quizApi'
import { UserQuiz } from '../api/quizTypes'

interface QuizStore {
  quizs: UserQuiz[]
  fetch: () => void
}

const getRandomAnswers = (
  incorrectAnswers: string[],
  correctAnswer: string
) => {
  return [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5)
}

const quizStore = create<QuizStore>((set) => ({
  quizs: [],
  fetch: async () => {
    try {
      const quizs = (await getQuiz()).map((quiz) => ({
        ...quiz,
        incorrect_answers: getRandomAnswers(
          quiz.incorrect_answers,
          quiz.correct_answer
        ),
        checkedAnswer: '',
      }))
      set({ quizs })
    } catch (e) {}
  },
}))
export default quizStore
