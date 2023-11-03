import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/home/home.jsx'
import Login from './components/login/login.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="home" exact />
        <Route Component={Login} path="/" exact />
        <Route Component={Dashboard} path="/dashboard" exact />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
