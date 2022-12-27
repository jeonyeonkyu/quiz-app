interface Quiz {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

interface UserQuiz extends Quiz {
  checkedAnswer: string
}

export type { Quiz, UserQuiz }
