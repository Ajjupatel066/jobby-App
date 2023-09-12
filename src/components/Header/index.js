import {Link, withRouter} from 'react-router-dom'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-element">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="ul-container">
          <Link className="link" to="/">
            <li className="link-text">Home</li>
            <AiFillHome className="icon" />
          </Link>
          <Link className="link" to="/jobs">
            <li className="link-text">Jobs</li>
            <BsFillBriefcaseFill to="/jobs" className="icon" />
          </Link>
          <Link to="/login">
            <li>
              <FiLogOut className="icon" />
            </li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
