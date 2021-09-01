import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

// Components
import MyBet from './MyBet';

// Redux actions
import * as actions from '../../actions/userActions';

const Profile = ({auth, changePseudo}) => {
  const [openEdit, setOpenEdit] = useState(false)

  const renderForm = () => {
    if(openEdit) {
      return (
        <Formik
          initialValues={{ pseudo: '' }}
          validate={values => {
            const errors = {};
            if (!values.pseudo) {
              errors.pseudo = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              changePseudo(auth, values)
              setSubmitting(false);
            }, 400);
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
            <form onSubmit={handleSubmit}>
              <input
                type="pseudo"
                name="pseudo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pseudo}
              />
              {errors.pseudo && touched.pseudo && errors.pseudo}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      )
    }
  }

  return (
    <div>
      <h1>Ton pseudo</h1>
      {auth.pseudo}
      <div onClick={() => setOpenEdit(!openEdit)}>Edit</div>
      {renderForm()}
      <h1>Ton Pari</h1>
      <MyBet />
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return { 
    auth
  }
}

export default connect(mapStateToProps, actions)(Profile)
