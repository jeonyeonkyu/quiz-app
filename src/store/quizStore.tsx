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
  incorrectAnswerNotes: string[]
  setCheckedAnswer: (selectedAnswer: number) => void
  setQuizPage: (pageIndex: number, pageMoveDelay?: number) => void
  setPrevPage: () => void
  setNextQuiz: () => void
  startTime: string
  endTime: string
  setIncorrectAnswerNotes: (value: string) => void
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
  incorrectAnswerNotes: [],

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

      set({
        quizzes,
        loading: false,
        startTime: new Date().toISOString(),
        incorrectAnswerNotes: Array.from({ length: quizzes.length }, () => ''),
      })
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
    const { endTime, quizzes, currentQuizIndex } = get()
    if (!pageMoveDelay) {
      return set({ currentQuizIndex: pageIndex })
    } else {
      const isSuccess =
        !endTime && quizzes.length && quizzes.length - 1 === currentQuizIndex

      setTimeout(() => {
        set({
          currentQuizIndex: pageIndex,
          endTime: isSuccess ? new Date().toISOString() : endTime,
        })
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
    set({
      hasCorrectAnswers: [...hasCorrectAnswers, isCorrect],
    })
    setQuizPage(currentQuizIndex + 1, 1000)
  },

  setPrevPage: () => {
    const { currentQuizIndex, setQuizPage } = get()
    setQuizPage(currentQuizIndex - 1)
  },

  setIncorrectAnswerNotes: (value) => {
    const { currentQuizIndex, incorrectAnswerNotes } = get()

    const changedIncorrectAnswerNotes = incorrectAnswerNotes.map(
      (string, index) => (index === currentQuizIndex ? value : string)
    )
    set({ incorrectAnswerNotes: changedIncorrectAnswerNotes })
  },
}))

export default quizStore
