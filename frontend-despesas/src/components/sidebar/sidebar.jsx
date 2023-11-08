import { Speedometer2, HouseDoor, BoxArrowLeft } from 'react-bootstrap-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom'
import { setBlur } from '../../utils/set-blur'

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <nav className="side_menu">
      <ul className="list">
        <li className="mb-4" onClick={(e) => setBlur(e)}>
          <a>
            <span className="icon">
              <FontAwesomeIcon
                icon={icon({
                  name: 'list',
                  style: 'solid'
                })}
                color="#fff"
              />
            </span>
          </a>
        </li>
        <li className="item_menu">
          <a onClick={() => navigate('/home')}>
            <span className="icon">
              <HouseDoor color="#fff" />
            </span>
            <span className="txt_link">Home</span>
          </a>
        </li>
        <li className="item_menu">
          <a onClick={() => navigate('/dashboard')}>
            <span className="icon mr-2">
              <Speedometer2 color="#fff" />
            </span>
            <span className="txt_link">Dashboard</span>
          </a>
        </li>
        <li className="item_menu">
          <a
            onClick={() => {
              navigate('/')
              localStorage.clear()
            }}
          >
            <span className="icon ml-2">
              <BoxArrowLeft color="#fff" />
            </span>
            <span className="txt_link">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
