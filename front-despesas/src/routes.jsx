import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/home/home.jsx'
import Login from './components/login/login.jsx'
// import Sobre from "./Sobre";
// import Usuario from "./Usuario";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/home" exact />
        <Route Component={Login} path="/" exact />
      </Routes>

      {/* <Route component = { Sobre }  path="/sobre" />
            <Route component = { Usuario }  path="/usuario" /> */}
    </BrowserRouter>
  )
}

export default Router
