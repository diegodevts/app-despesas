import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function setBlur(e) {
  let sideMenu = document.querySelector('.side_menu')
  let container = document.querySelector('.container')
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

//
const Home = () => {
  return (
    <>
      <nav className="mr-4 side_menu">
        <ul className="list">
          <li className="mb-4" onClick={(e) => setBlur(e)}>
            <a>
              <span className="icon ml-2">
                <i className="bi bi-list" />
              </span>
            </a>
          </li>
          <li className="item_menu">
            <a>
              <span className="icon ml-2">
                <i className="bi bi-house-door" />
              </span>
              <span className="txt_link">Home</span>
            </a>
          </li>
          <li className="item_menu">
            <a>
              <span className="icon ml-2">
                <i className="bi bi-speedometer2" />
              </span>
              <span className="txt_link">Dashboard</span>
            </a>
          </li>
          <li className="item_menu">
            <a>
              <span className="icon ml-2">
                <i className="bi bi-box-arrow-left" />
              </span>
              <span className="txt_link">Logout</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="container" onMouseDown={(e) => setBlur((e = !e))}>
        <h5 className="text-center">Dashboard</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="items mt-2">
              <div className="col-md-6 text-start">
                <label style={{ color: '#ccc6c6', fontSize: 'small' }}>
                  Saldo atual
                </label>
                <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                  {'R$ 1000'}
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

          <div className="col-md-4">
            <div className="items mt-2">
              <div className="col-md-6 text-start">
                <label style={{ color: '#ccc6c6', fontSize: 'small' }}>
                  Receita
                </label>
                <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                  {'R$ 20000'}
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

          <div className="col-md-4">
            <div className="items mt-2">
              <div className="col-md-6 text-start">
                <label style={{ color: '#ccc6c6', fontSize: 'small' }}>
                  Despesas
                </label>
                <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>
                  {'R$ 10000 '}
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
            <div className="col-md-4 mr-1">
              <label className="text-start">Descrição</label>
              <input
                type="text"
                name="description"
                id="description"
                className="form-control"
                style={{ height: '31px', width: '220px' }}
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
                className="form-control"
                style={{ height: '31px', width: '220px' }}
                placeholder="Escreva um valor"
              />
            </div>

            <div className="col-sm-4 mt-4 ml-2">
              <div>
                <label className="mr-1">
                  <small>Saída</small>
                </label>
                <input type="radio" value="0" name="type" />
              </div>
              <div className="ml-1">
                <label className="mr-1">
                  <small>Entrada</small>
                </label>
                <input type="radio" value="1" name="type" />
              </div>
              <div className="ml-4 d-flex flex-row-reverse">
                <button
                  type="submit"
                  title="Adicionar"
                  className="btn btn-success d-flex justify-content-center"
                >
                  <small>Adicionar</small>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="row charts mr-2 mt-4">
          <div className="col-md-12">
            <table>
              <thead>
                <th className="text-start">
                  <small>Descrição</small>
                </th>
                <th className="text-center">
                  <small>Valor</small>
                </th>
                <th className="text-center">
                  <small>Tipo</small>
                </th>
                <th className="text-center">
                  <small>Ações</small>
                </th>
              </thead>
              <hr width="100%" />
              <tbody>
                <td className="text-start">
                  <small>
                    <p>{'descrição'}</p>
                  </small>
                </td>

                <td className="text-center">
                  <small>{'valor'}</small>
                </td>

                <td className="text-center">
                  <FontAwesomeIcon
                    icon={icon({ name: 'arrow-up', style: 'solid' })}
                    color="#1ab424"
                  />
                  <FontAwesomeIcon
                    icon={icon({ name: 'arrow-down', style: 'solid' })}
                    color="#d80808"
                  />
                </td>

                <td className="text-center">
                  <button className="btn-actions">
                    <FontAwesomeIcon
                      icon={icon({ name: 'trash', style: 'solid' })}
                    />
                  </button>
                  <button className="btn-actions ml-4">
                    <FontAwesomeIcon
                      icon={icon({
                        name: 'pen-to-square',
                        style: 'solid'
                      })}
                    />
                  </button>
                </td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
