import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

describe('메인 페이지', () => {
  it('퀴즈 시작 버튼 클릭시 퀴즈 페이지로 이동되는지 확인', async () => {
    render(<App />)
    expect(screen.getByRole('button')).toHaveTextContent('퀴즈 시작')
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('퀴즈')).toBeInTheDocument()
  })
})
