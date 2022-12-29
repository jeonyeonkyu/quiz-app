import { Quiz } from './quizTypes'

const apiURL =
  process.env.NODE_ENV === 'test' ? '/quizzes' : process.env.REACT_APP_API_URL

export const getQuiz = async (amount = 10): Promise<Quiz[]> => {
  try {
    const response = await fetch(`${apiURL}?amount=${amount}`)
    if (response.ok) {
      return (await response.json()).results
    }
    return Promise.reject(response)
  } catch (e) {
    return Promise.reject(e)
  }
}
