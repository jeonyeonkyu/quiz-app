import create from 'zustand'
import { getQuiz } from '../api/quizApi'
import { UserQuiz } from '../api/quizTypes'

interface QuizStore {
  quizzes: UserQuiz[]
  fetch: () => void
  currentQuizIndex: number
  loading: boolean
  hasError: boolean
  setCheckedAnswer: (selectedAnswer: number) => void
  setNextQuiz: () => void
}

const getRandomAnswers = (
  incorrectAnswers: string[],
  correctAnswer: string
) => {
  return [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5)
}

const decodeHTMLEntities = (value: string) => {
  let txt = document.createElement('textarea')
  txt.innerHTML = value
  return txt.value
}

const quizStore = create<QuizStore>((set, get) => ({
  quizzes: [],
  currentQuizIndex: 0,
  loading: false,
  hasError: false,
  fetch: async () => {
    try {
      set({ loading: true, hasError: false })
      const quizzes = (await getQuiz()).map((quiz) => ({
        ...quiz,
        question: decodeHTMLEntities(quiz.question),
        incorrect_answers: getRandomAnswers(
          quiz.incorrect_answers.map(decodeHTMLEntities),
          decodeHTMLEntities(quiz.correct_answer)
        ),
        correct_answer: decodeHTMLEntities(quiz.correct_answer),
        checkedAnswer: '',
      }))
      set({ quizzes, loading: false })
    } catch (e) {
      set({ hasError: true, loading: false })
    }
  },
  setCheckedAnswer: (selectedIndex: number) => {
    const { currentQuizIndex, quizzes } = get()
    const checkedQuizzes = quizzes.map((quiz, index) =>
      index === currentQuizIndex
        ? { ...quiz, checkedAnswer: quiz.incorrect_answers[selectedIndex] }
        : quiz
    )
    set({ quizzes: checkedQuizzes })
  },
  setNextQuiz: () => {
    const { currentQuizIndex } = get()
    set({ currentQuizIndex: currentQuizIndex + 1 })
  },
}))
export default quizStore
