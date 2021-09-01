import React from 'react';
import {connect} from 'react-redux';

const MyBet = ({user}) => {
  return (
    <div>
      TON PARI !!!
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(MyBet);
