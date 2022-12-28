import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'
import { mockLocation, renderWithRouter } from '../testing'
import { routes } from '../Routes'

describe('메인 페이지', () => {
  it('메인페이지에서 퀴즈 시작 버튼 클릭시 퀴즈를 시작할 수 있다.', async () => {
    renderWithRouter(<App />)
    const button = screen.getByRole('button', { name: '퀴즈 시작' })
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    await waitFor(() => {
      expect(mockLocation.get()).toEqual(routes.quiz)
    })
  })
})
