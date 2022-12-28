import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { routes } from '../Routes'

const Home = () => {
  return (
    <HomeWrapper>
      <ButtonLink to={routes.quiz}>
        <Button variant="contained">퀴즈 시작</Button>
      </ButtonLink>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div``

const ButtonLink = styled(Link)`
  text-decoration: none;
`

export default Home
