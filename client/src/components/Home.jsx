import React from 'react';
import {connect} from 'react-redux';

const Home = ({auth}) => {
  const renderContent = () => {
    switch(auth) {
      case null:
        return;
      case false:
        return (
          <button className='btn-orange-large'>
            <a href="/auth/google">Se connecter avec Google</a>
          </button>
        )
      default:
        return (
            <button className='btn-orange-large'>
              <a href={`/profile/${auth._id}`}>Mon profil</a>
            </button>
        )
    }
  }

  return (
    <div className='text-center'>
      <h1>LOOSAMAX</h1>
      <h3>Viens perdre des sous entre amis</h3>
      {renderContent()}
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Home)
