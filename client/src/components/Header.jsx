import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({user}) => {
  const ref = useRef(null)
  useOutsideAlerter(ref)
  const [dropDown, setDropDown] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              setDropDown(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }
  
  const renderContent = () => {
    if(user && Object.keys(user).length === 0) {
      return null
    }

    switch(user) {
      case false:
        return <ul><li><a href="/auth/google">Se connecter avec Google</a></li></ul>
      default:
        return (
            <ul>
              <li><Link to={`/weekbets`}>Les paris de la semaine</Link></li>
              <li><Link to='/stats'>Stats</Link></li>
              <li><Link to='/mesparis'>Mes Paris</Link></li>
              <li><Link to={`/profile/${user._id}`}>Mon profil</Link></li>
              <li><a href="/api/logout">Déconnexion</a></li>
            </ul>
        )
    }
  }

  return (
    <nav ref={ref}>
      <div className="nav-wrapper">
        <Link 
          to={user ? `/leagues` : '/'} 
          className="brand"
        >
          Loosamax
        </Link>
        <div className="toggle-button" onClick={() => setDropDown(!dropDown)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className={`navbar-links ${dropDown ? 'active' : null}`}>
          {renderContent()}
        </div>
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
