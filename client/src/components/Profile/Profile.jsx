import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

// Components
import MyBet from './MyBet';
import ColorEditor from './ColorEditor';
import FormPseudo from './FormPseudo';

import { askForSubscription } from '../../subscriptionHandler'
import { useParams } from 'react-router-dom'

const Profile = ({user}) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [show, setShow] = useState(false)
	const [subscription] = useState(Notification.permission)

  let { id } = useParams();

  useEffect(() => {
    setShow(false)
    askForSubscription(user)
  }, [user.color])

  const renderForm = () => {
    if(openEdit) {
      return (
        <FormPseudo user={user} setOpenEdit={setOpenEdit}/>
      )
    }
  }

  const renderColorEditor = () => {
    if(show) {
      return (
        <ColorEditor user={user} setShow={setShow}/>
      )
    }
  }

  const renderNotification = () => {
    if(subscription === "granted") {
      return (
        <FontAwesomeIcon icon={faCheck} className="green-dark" />
      )
    } else {
      return (
        <FontAwesomeIcon icon={faTimes} className="risky"/>
      )
    }
  }

  const renderProfile = () => {
    if (user._id !== id) {
      return (
        <>
          <p className="text-comment">On essaie d'aller espionner ses petits copains ?</p>
          <p className="text-comment">Oust, on aime pas le voyeurisme ici !</p>
        </>
      )
    } else {
      return (
        <>
          <h1>Ton profil</h1>
          <div className="d-flex justify-content-center align-items-center">
            <h2>{user.pseudo}</h2>
            <div className="card-color" style={{backgroundColor: `${user.color}`, marginLeft: `4px`}} onClick={() => setShow(!show)}></div>
            <div className="clickable" style={{marginLeft: `4px`}}  onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "Fermer" : <FontAwesomeIcon icon={faPencilAlt} />}</div>
          </div>
          {renderForm()}
          <i className='text-center' style={{margin: '4px', fontSize: '12px'}}>La couleur est utilisée dans la page des stats pour afficher les graphiques. Tu peux la modifier en cliquant dessus.</i>
          {renderColorEditor()}
          <div className="mt-1">Notification : {renderNotification()}</div>
          <i className='text-center font-size-12px' style={{margin: '4px'}}>Les notifications ne peuvent être activées / désactivées que par toi via le navigateur</i>
          <MyBet />
        </>
      )
    }
  }

  return (
    <div className='d-flex container-center'>
      {renderProfile()}
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return { 
    user
  }
}

export default connect(mapStateToProps, null)(Profile)
