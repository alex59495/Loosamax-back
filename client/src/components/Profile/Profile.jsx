import React, {useState} from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import MyBet from './MyBet';
import MyColor from './MyColor';
import FormPseudo from './FormPseudo';

const Profile = ({user}) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [background, setBackground] = useState(user.color)
  const [show, setShow] = useState(false)

  const renderForm = () => {
    if(openEdit) {
      return (
        <FormPseudo user={user} setOpenEdit={setOpenEdit}/>
      )
    }
  }

  return (
    <div className='d-flex container-center'>
      <h1>Ton profil</h1>
      <div className="d-flex justify-content-center align-items-center">
        <h2>{user.pseudo}</h2>
        <div className="card-color" style={{backgroundColor: `${background}`, marginLeft: `4px`}} onClick={() => setShow(!show)}></div>
        <div className="action" style={{marginLeft: `4px`}}  onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "Fermer" : <FontAwesomeIcon icon={faPencilAlt} />}</div>
      </div>
      {renderForm()}
      <i className='text-center' style={{margin: '4px', fontSize: '12px'}}>La couleur est utilisée dans la page des stats pour afficher les graphiques. Tu peux la modifier en cliquant dessus.</i>
      <MyColor user={user} setBackground={setBackground} setShow={setShow} background={background} show={show}/>
      <MyBet />
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return { 
    user
  }
}

export default connect(mapStateToProps, null)(Profile)
