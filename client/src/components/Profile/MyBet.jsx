import React from 'react';
import {connect} from 'react-redux';

const MyBet = ({auth}) => {
  return (
    <div>
      TON PARI !!!
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(MyBet);
