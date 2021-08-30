import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const renderContent = () => {
    switch(props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>
      default:
        return (
          <a href="/api/logout">Logout</a>
        )
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link 
          to={props.auth ? '/profile' : '/'} 
          className="left brand-logo"
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
