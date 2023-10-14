import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Login = () => {
  return (
    <>
      <div
        className="container"
        style={{ background: 'linear-gradient(#6c757d, #a0acb7)' }}
      >
        <form className="login-form">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center">Login</h1>
              <input
                type="text"
                placeholder="insira seu email"
                className="form-control mt-4"
              />

              <input
                type="text"
                placeholder="insira sua senha"
                className="form-control mt-1"
              />

              <FontAwesomeIcon
                className="icon"
                icon={icon({ name: 'eye', style: 'solid' })}
              />
              <FontAwesomeIcon
                className="icon"
                icon={icon({ name: 'eye-slash', style: 'solid' })}
              />
              {/* <fa-icon class="icon" (click)="set()" *ngIf="!iconOf" [icon]="faEyeSlash"></fa-icon> */}

              <button className="btn btn-outline-secondary mt-4 w-100">
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
