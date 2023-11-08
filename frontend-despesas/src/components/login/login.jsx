import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import './login.css'
import { login } from '../../config/http'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MyContext from '../../contexts/items-context'

const setEye = () => {
  let password = document.getElementById('password')
  let eye = document.querySelector('.icon_eye')
  let eyeSlash = document.querySelector('.icon_eye_slash')

  if (password.type === 'password') {
    password.type = 'text'
    eye.setAttribute('style', 'visibility: visible')
    eyeSlash.setAttribute('style', 'visibility: hidden')
  } else {
    password.type = 'password'
    eyeSlash.setAttribute('style', 'visibility: visible')
    eye.setAttribute('style', 'visibility: hidden')
  }
}
const Login = () => {
  const { register, handleSubmit } = useForm()
  const { notifyError } = useContext(MyContext)
  const navigate = useNavigate()
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer)
  const dispatch = useDispatch()

  const handleLogin = async (data) => {
    const response = await login(data.email, data.password)

    if (!response.token) {
      return notifyError(response.message)
    }

    dispatch({
      type: 'user/login',
      payload: {
        token: response.token
      }
    })

    localStorage.setItem('token', response.token)
    navigate('/home')
  }

  return (
    <>
      <div className="main_login">
        <div className="container_login">
          <form className="login-form">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="text-center">Login</h1>
                <input
                  type="text"
                  {...register('email')}
                  id="email"
                  placeholder="insira seu email"
                  className="form-control mt-4"
                />

                <input
                  type="password"
                  {...register('password')}
                  id="password"
                  placeholder="insira sua senha"
                  className="form-control mt-1"
                />
                <label>
                  <FontAwesomeIcon
                    onClick={() => setEye()}
                    className="icon_eye"
                    icon={icon({ name: 'eye', style: 'solid' })}
                  />
                  <FontAwesomeIcon
                    onClick={() => setEye()}
                    className="icon_eye_slash"
                    icon={icon({ name: 'eye-slash', style: 'solid' })}
                  />
                </label>

                <button
                  className="btn btn-outline-secondary mt-4 w-100"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit(handleLogin)()
                  }}
                >
                  Entrar
                </button>
                <ToastContainer autoClose={2000} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
