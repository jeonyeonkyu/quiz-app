import React from 'react'
import Layout from './components/layout'
import { CssBaseline } from '@mui/material'
import Routes from './Routes'

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes />
      </Layout>
    </>
  )
}

export default App
