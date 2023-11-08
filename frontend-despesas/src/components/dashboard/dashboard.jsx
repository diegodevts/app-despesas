import Sidebar from '../sidebar/sidebar'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './dashboard.css'
import { setBlur } from '../../utils/set-blur'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="main" onMouseDown={(e) => setBlur((e = !e))}>
        <div className="container" style={{ marginLeft: '28%' }}>
          <h5 className="text-center" style={{ width: '690px' }}>
            Dashboard
          </h5>
          <div className="row">
            <div
              className="col-md-6 dash"
              style={{ marginLeft: '110px', marginTop: '70px' }}
            >
              <div style={{ width: 400 }}>
                <Doughnut
                  data={{
                    labels: ['Jun', 'Jul', 'Aug'],
                    datasets: [
                      {
                        id: 1,
                        label: '0',
                        data: [5, 6, 7]
                      },
                      {
                        id: 2,
                        label: '0',
                        data: [3, 2, 1]
                      }
                    ]
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
