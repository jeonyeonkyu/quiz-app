import React from 'react'
import { renderHook, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { renderWithRouter, textContentMatcher } from '../testing'
import { routes } from '../Routes'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import useQuiz from '../hooks/useQuiz'

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('퀴즈 페이지', () => {
  it('퀴즈를 선택하여 다음으로 넘어갈 수 있다', async () => {
    renderWithRouter(<App />, { route: routes.quiz })
    const top = await screen.findByText('퀴즈')
    expect(top).toBeInTheDocument()

    await waitFor(async () => {
      expect(
        await screen.findByText(textContentMatcher(/1.*/))
      ).toBeInTheDocument()
    })

    expect(screen.queryByText('다음 문항')).not.toBeInTheDocument()
    const radioButtons = screen.getAllByRole('radio')

    await waitFor(async () => await userEvent.click(radioButtons[0]))
    expect(screen.getByText('다음 문항')).toBeInTheDocument()

    userEvent.click(screen.getByText('다음 문항'))

    // 애니메이션 요소로 인해 1초간 딜레이 됩니다.
    await act(async () => {
      await delay(1000)
    })

    expect(
      await screen.findByText(textContentMatcher(/2.*/))
    ).toBeInTheDocument()
  })

  it('퀴즈를 완료할 수 있다', async () => {
    renderWithRouter(<App />, { route: routes.quiz })
    const { result } = renderHook(() => useQuiz())
    const { setQuizPage, quizzes } = result.current
    act(() => setQuizPage(quizzes.length))
    const top = await screen.findByText('결과')
    expect(top).toBeInTheDocument()
  })
})
