import { Formik } from 'formik';
import { connect } from 'react-redux';

// Redux actions
import {updateUser} from '../../actions/userActions';

const FormPseudo = ({user, updateUser, setOpenEdit}) => {
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
        updateUser(user, values);
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
        <form onSubmit={handleSubmit} className='container-center mb-1'>
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
          <button type="submit" disabled={isSubmitting} className='btn-orange'>
            Changer
          </button>
        </form>
      )}
    </Formik>
  )
}

export default connect(null, {updateUser})(FormPseudo)