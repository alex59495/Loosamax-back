import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

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
              errors.pseudo = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              changePseudo(user, values)
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
      {user.pseudo}
      <div onClick={() => setOpenEdit(!openEdit)}>Edit</div>
      {renderForm()}
      <MyBet />
    </div>
  )
}

const mapStateToProps = ({user}) => {
  return { 
    user
  }
}

export default connect(mapStateToProps, actions)(Profile)
