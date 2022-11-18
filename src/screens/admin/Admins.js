import React, { useEffect } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../services/actions/authAction'
import { loginAdmin } from '../../services/actions/authAction'
import "../login/login.css";
import MiniLoader from "../../components/loading/MiniLoader";

const AdminLogin = ({ loginAdmin, history, isAuth, authLoading }) => {

  useEffect(() => {
    if (isAuth === true) {
      history.push('/')
    }
  }, [isAuth, history])

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email requerido";
          }
          else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email inválido";
          }
          if (!values.password) {
            errors.password = "Contraseña requerida";
          } else if (values.password.length < 6) {
            errors.password = "La contraseña debe ser igual o mayor a 6 caracteres";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password } = values
          loginAdmin({ email, password }, history)
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
          isSubmitting
          /* and other goodies */
        }) => (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-overlay">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="login-left">
                        <div className="login-left-overlay">

                          <div className="name-section">
                            <input
                              type="email"
                              placeholder="Ingrese email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            {errors.email && touched.email && (
                              <p className="error">{errors.email}</p>
                            )}
                          </div>
                          <div className="phone-section">
                            <input
                              type="password"
                              placeholder="Ingrese contraseña"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            {errors.password && touched.password && (
                              <p className="error">{errors.password}</p>
                            )}
                          </div>
                          <button type="submit" className="login-btn">
                            Ingresar {authLoading && <MiniLoader />}
                          </button>
                          
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
};

AdminLogin.propTypes = {
  login: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authLoading: state.auth.loading,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { loginAdmin })(AdminLogin);
