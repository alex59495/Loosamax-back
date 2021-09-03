import React from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

const Home = ({user}) => {
  const renderContent = () => {
    if(user && Object.keys(user).length === 0) {
      return (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )
    }
    switch(user) {
      case false:
        return (
          <button className='btn-orange-large'>
            <a href="/auth/google" data-test="button-login">Se connecter avec Google</a>
          </button>
        )
      default:
        return (
            <button className='btn-orange-large'>
              <a href={`/profile/${user._id}`} data-test="button-profile">Mon profil</a>
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

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(Home)
