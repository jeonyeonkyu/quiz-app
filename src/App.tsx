import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import { CssBaseline } from '@mui/material'
import routes from './consts/routes'
import Quiz from './pages/Quiz'

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path={routes.quiz} element={<Quiz />} />
          </Routes>
        </Router>
      </Layout>
    </>
  )
}

export default App
