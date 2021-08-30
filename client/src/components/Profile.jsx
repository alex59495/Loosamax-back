import React, {useState} from 'react';
import { connect } from 'react-redux';

import {changePseudo} from '../actions/index'

const Profile = ({auth}) => {
  const [openEdit, setOpenEdit] = useState(false)

  const renderForm = () => {
    if(openEdit) {
      return (
        <>
          <input type="text" name="pseudo" placeholder="Change ton pseudo.."/>
          <button type="submit" onClick={() => changePseudo(auth.id)}>Changer</button>
        </>
      )
    }
  }

  return (
    <div>
      <h1>Ton pseudo</h1>
      {auth.pseudo}
      <div onClick={() => setOpenEdit(!openEdit)}>Edit</div>
      {renderForm()}
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return { 
    auth
  }
}

export default connect(mapStateToProps)(Profile)
