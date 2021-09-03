import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({user}) => {
  const renderContent = () => {
    if(user && Object.keys(user).length === 0) {
      return null
    }

    switch(user) {
      case false:
        return <li><a href="/auth/google">Se connecter avec Google</a></li>
      default:
        return (
          <div className='d-flex'>
            <Link to={`/weekbets`}>Les paris de la semaine</Link>
            <Link to='/stats'>Mes Stats</Link>
            <Link to={`/profile/${user._id}`}>Mon profil</Link>
            <a href="/api/logout">Déconnexion</a>
          </div>
        )
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link 
          to={user ? `/leagues` : '/'} 
          className="brand"
        >
          Loosamax
        </Link>
        <ul id="nav-mobile" className="right">
          {renderContent()}
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = ({user}) => {
  return { 
    user
  }
} 


export default connect(mapStateToProps)(Header)
