import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const renderContent = () => {
    switch(props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Se connecter avec Google</a></li>
      default:
        return (
          <div className='d-flex'>
            <a href={`/profile/${props.auth._id}`}>Mon profil</a>
            <a href="/api/logout">Déconnexion</a>
          </div>
        )
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link 
          to={props.auth ? `/games` : '/'} 
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

const mapStateToProps = ({auth}) => {
  return { 
    auth
  }
} 


export default connect(mapStateToProps)(Header)
