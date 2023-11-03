import React from 'react'
import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useForm } from 'react-hook-form'
import Items from '../items/items'
import { useContext, lazy } from 'react'
import MyContext from '../../contexts/items-context'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../sidebar/sidebar'
import 'react-toastify/dist/ReactToastify.css'

function setBlur(e) {
  let sideMenu = document.querySelector('.side_menu')
  let container = document.querySelector('.main')
  let width = sideMenu.getAttribute('style')
  if (!e) {
    sideMenu.setAttribute('style', 'width: 50px; transition: .2s')
    container.setAttribute('style', 'filter: none')
    width = ''
    return
  }
  e.preventDefault()
  if (width && ~width.indexOf('200px')) {
    sideMenu.setAttribute('style', 'width: 50px; transition: .2s')
    container.setAttribute('style', 'filter: none')
    width = ''
  } else {
    sideMenu.setAttribute('style', 'width: 200px; transition: .2s')
    container.setAttribute('style', 'filter: blur(8px)')
  }
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm()
  const { onSubmit, data } = useContext(MyContext)

  const balance = {
    currentBalance: data
      .map(({ value }) => value)
      .reduce((previous, current) => previous + current, 0),
    income: data
      .filter((item) => item.type)
      .map(({ value }) => value)
      .reduce((previous, current) => previous + current, 0),
    expenses: data
      .filter((item) => !item.type)
      .map(({ value }) => value)
      .reduce((previous, current) => previous + current, 0)
  }

  return (
    <>
      <Sidebar />
      <div className="main" onMouseDown={(e) => setBlur((e = !e))}>
        <div className="container" style={{ marginLeft: '28%' }}>
          <h5 className="text-center" style={{ width: '690px' }}>
            Home
          </h5>
          <div className="row">
            <div className="col-md-4" style={{ maxWidth: '230px' }}>
              <div className="items mt-2">
                <div className="col-md-6">
                  <label style={{ color: '#ccc6c6', fontSize: 'small' }}>
                    Saldo atual
                  </label>
                  <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                    {balance.currentBalance}
                  </span>
                </div>
                <div className="col-md-4 icon">
                  <span className="balance_icon">
                    <FontAwesomeIcon
                      icon={icon({
                        name: 'building-columns',
                        style: 'solid'
                      })}
                      color="#fff"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4" style={{ maxWidth: '230px' }}>
              <div className="items mt-2">
                <div className="col-md-6 text-start">
                  <label style={{ color: '#ccc6c6', fontSize: 'small' }}>
                    Receita
                  </label>
                  <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                    {balance.income}
                  </span>
                </div>
                <div className="col-md-4 icon">
                  <span className="income_icon">
                    <FontAwesomeIcon
                      icon={icon({ name: 'arrow-up', style: 'solid' })}
                      color="#fff"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4" style={{ maxWidth: '230px' }}>
              <div className="items mt-2">
                <div className="col-md-6 text-start">
                  <label style={{ color: '#ccc6c6', fontSize: 'small' }}>
                    Despesas
                  </label>
                  <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                    {Math.abs(balance.expenses)}
                  </span>
                </div>
                <div className="col-md-4 icon">
                  <span className="expense_icon">
                    <FontAwesomeIcon
                      icon={icon({ name: 'arrow-down', style: 'solid' })}
                      color="#fff"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row form mt-4">
            <form>
              <div className="col-md-4">
                <label className="text-start">Descrição</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="inputs"
                  {...register('description')}
                  style={{ height: '31px', width: '200px' }}
                  placeholder="Escreva uma descrição"
                />
                <div className="invalid-feedback">
                  Por favor, coloque uma descrição
                </div>
              </div>

              <div className="col-md-4 ml-2">
                <label className="text-start">Valor</label>
                <input
                  type="number"
                  className="inputs"
                  {...register('value')}
                  style={{ height: '31px', width: '200px' }}
                  placeholder="Escreva um valor"
                />
              </div>

              <div className="col-sm-3 mt-1">
                <div>
                  <label className="text-start">Tipo</label>
                  <select
                    defaultValue={'Entrada'}
                    aria-label="Default select example"
                    {...register('type')}
                    style={{
                      width: '148px',
                      height: '31px',
                      borderRadius: '5px'
                    }}
                  >
                    <option value="1">Entrada</option>
                    <option value="0">Saida</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit(onSubmit)()
                    reset({ description: '', value: '' })
                  }}
                  title="Adicionar"
                  className="btn btn-success d-flex justify-content-center"
                >
                  <small>Adicionar</small>
                </button>
                <ToastContainer autoClose={2000} />
              </div>
            </form>
          </div>

          <Items />
        </div>
      </div>
    </>
  )
}

export default Home
