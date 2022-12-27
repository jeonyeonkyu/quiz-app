import styled from '@emotion/styled'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <LayoutContainer>{children}</LayoutContainer>
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
`

export default Layout
