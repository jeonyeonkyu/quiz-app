import React from 'react'
import styled from '@emotion/styled'
import QuizContainer from '../containers/QuizContainer'

const Quiz = () => {
  return (
    <>
      <Header>
        <h1>퀴즈</h1>
      </Header>
      <QuizContainer />
    </>
  )
}

const Header = styled.header``

export default Quiz
