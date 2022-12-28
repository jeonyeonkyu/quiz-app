import create from 'zustand'
import { getQuiz } from '../api/quizApi'
import { UserQuiz } from '../api/quizTypes'

export interface QuizStore {
  quizzes: UserQuiz[]
  hasCorrectAnswers: boolean[]
  fetch: () => void
  currentQuizIndex: number
  loading: boolean
  hasError: boolean
  isSuccess: boolean
  setCheckedAnswer: (selectedAnswer: number) => void
  setNextQuiz: () => void
  setSuccess: () => void
  startTime: string
  endTime: string
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
  hasCorrectAnswers: [],
  currentQuizIndex: 0,
  loading: false,
  hasError: false,
  isSuccess: false,
  startTime: '',
  endTime: '',

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

      set({ quizzes, loading: false, startTime: new Date().toISOString() })
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

  setSuccess: () => {
    set({ isSuccess: true, endTime: new Date().toISOString() })
  },

  setNextQuiz: () => {
    const { currentQuizIndex, quizzes, hasCorrectAnswers, setSuccess } = get()
    const quiz = quizzes[currentQuizIndex]
    const isCorrect = quiz.checkedAnswer === quiz.correct_answer
    set({ hasCorrectAnswers: [...hasCorrectAnswers, isCorrect] })

    setTimeout(() => {
      if (currentQuizIndex === quizzes.length - 1) {
        setSuccess()
      } else {
        set({ currentQuizIndex: currentQuizIndex + 1 })
      }
    }, 1000)
  },
}))
export default quizStore
