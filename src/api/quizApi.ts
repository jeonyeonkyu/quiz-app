import { Quiz } from './quizTypes'

export const API_URL = 'https://opentdb.com/api.php'

const PROXY_API_URL = 'http://localhost:4000'

export const getQuiz = async (amount = 10): Promise<Quiz[]> => {
  try {
    const response = await fetch(`${PROXY_API_URL}?amount=${amount}`)
    if (response.ok) {
      return (await response.json()).results
    }
    return Promise.reject(response)
  } catch (e) {
    return Promise.reject(e)
  }
}
