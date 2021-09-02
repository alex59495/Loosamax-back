import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

// Components
import MyBet from './MyBet';

// Redux actions
import * as actions from '../../actions/userActions';

const Profile = ({user, changePseudo}) => {
  const [openEdit, setOpenEdit] = useState(false)

  const renderForm = () => {
    if(openEdit) {
      return (
        <Formik
          initialValues={{ pseudo: '' }}
          validate={values => {
            const errors = {};
            if (!values.pseudo) {
              errors.pseudo = 'Tu dois avoir un joli petit nom.';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            changePseudo(user, values);
            setOpenEdit(false);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className='mb-1'>
              <input
                type="pseudo"
                name="pseudo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pseudo}
              />
              <div className="form-error">
                {errors.pseudo && touched.pseudo && errors.pseudo}
              </div>
              <button type="submit" disabled={isSubmitting} className='btn-salmon'>
                Changer
              </button>
            </form>
          )}
        </Formik>
      )
    }
  }

  return (
    <div className='d-flex container-center'>
      <h1>Ton pseudo</h1>
      <div className="d-flex justify-content-center align-items-center">
        <h2>{user.pseudo}</h2>
        <div className="ml-1 action" onClick={() => setOpenEdit(!openEdit)}>{openEdit ? "Fermer" : "Modifier"}</div>
      </div>
      {renderForm()}
      <MyBet />
      <Link className='btn-orange' to='/leagues'>Voir les paris disponibles</Link>
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return { 
    user
  }
}

export default connect(mapStateToProps, actions)(Profile)
