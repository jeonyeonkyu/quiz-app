import React from 'react'
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom'
import Quiz from './pages/Quiz'
import Home from './pages/Home'

export const routes = {
  index: '/',
  quiz: '/quiz',
}

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route index element={<Home />} />
      <Route path={routes.quiz} element={<Quiz />} />
    </ReactRouterRoutes>
  )
}

export default Routes
