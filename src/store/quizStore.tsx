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
  setCheckedAnswer: (selectedAnswer: number) => void
  setQuizPage: (pageIndex: number, pageMoveDelay?: number) => void
  setPrevPage: () => void
  setNextQuiz: () => void
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

  setQuizPage: (pageIndex, pageMoveDelay) => {
    if (!pageMoveDelay) {
      return set({ currentQuizIndex: pageIndex })
    } else {
      setTimeout(() => {
        set({ currentQuizIndex: pageIndex })
      }, pageMoveDelay)
    }
  },

  setNextQuiz: () => {
    const {
      currentQuizIndex,
      quizzes,
      hasCorrectAnswers,
      endTime,
      setQuizPage,
    } = get()

    if (endTime) {
      return setQuizPage(currentQuizIndex + 1)
    }

    const quiz = quizzes[currentQuizIndex]
    const isCorrect = quiz.checkedAnswer === quiz.correct_answer
    const isSuccess = quizzes.length && quizzes.length - 1 === currentQuizIndex
    set({
      hasCorrectAnswers: [...hasCorrectAnswers, isCorrect],
      endTime: isSuccess ? new Date().toISOString() : endTime,
    })
    setQuizPage(currentQuizIndex + 1, 1000)
  },

  setPrevPage: () => {
    const { currentQuizIndex, setQuizPage } = get()
    setQuizPage(currentQuizIndex - 1)
  },
}))

export default quizStore
