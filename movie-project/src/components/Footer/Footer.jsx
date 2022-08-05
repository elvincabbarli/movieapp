import React , {useContext} from "react";
import './Footer.css'
import {Link, useNavigate} from 'react-router-dom'
import { faArrowTrendUp , faFilm , faMagnifyingGlass , faHeartPulse , faIdCard , faRightToBracket , faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../store/auth-context";



const Footer = () => {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const isLoggedIn = authCtx.isLoggedIn
    const logoutHandler = () => {
      authCtx.logout()
      navigate('/')
    }
  return (
    <div className="footer-container">
      <div className="nav-links">
        <div className="trending" style={{display: 'flex',flexDirection: 'column'}}>
          <FontAwesomeIcon className="font-icon" icon={faArrowTrendUp} />
          <Link style={{color: '#fff' , marginTop: '5px' , textDecoration: 'none'}} to='/'>Trendings</Link>
        </div>
        <div className="movies" style={{display: 'flex',flexDirection: 'column'}}>
          <FontAwesomeIcon className="font-icon" icon={faFilm} />
          <Link style={{color: '#fff' , marginTop: '5px' , textDecoration: 'none'}} to='/movies'>Movies</Link>
        </div>
        <div className="search" style={{display: 'flex',flexDirection: 'column'}}>
          <FontAwesomeIcon className="font-icon" icon={faMagnifyingGlass} />
          <Link style={{color: '#fff' , marginTop: '5px' , textDecoration: 'none'}} to='/search'>Search</Link>
        </div>
        <div className="favorites" style={{display: 'flex',flexDirection: 'column'}}>
          <FontAwesomeIcon className="font-icon" icon={faHeartPulse} />
          <Link style={{color: '#fff' , marginTop: '5px' , textDecoration: 'none'}} to='/favorites'>Favorites</Link>
        </div>
        {!isLoggedIn && <div className="registration" style={{display: 'flex',flexDirection: 'column'}}>
          <FontAwesomeIcon className="font-icon" icon={faIdCard} />
          <Link style={{color: '#fff' , marginTop: '5px' , textDecoration: 'none'}} to='/registration'>Registration</Link>
        </div>}

        {!isLoggedIn && <div className="loginn" style={{display: 'flex',flexDirection: 'column'}}>
          <FontAwesomeIcon className="font-icon" icon={faRightToBracket} />
          <Link style={{color: '#fff' , marginTop: '5px' , textDecoration: 'none'}} to='/login'>Login</Link>
        </div>}

        {isLoggedIn && <div className="logout" style={{display: 'flex',flexDirection: 'column'}}>
          <FontAwesomeIcon className="font-icon" icon={faRightFromBracket} />
          <button onClick={logoutHandler} className="logout-button" style={{color: '#fff' , marginTop: '5px' , textDecoration: 'none' ,background:'none'}}>Logout</button>
        </div> }
        
        
          
      </div>
    </div>
  )
}

export default Footer