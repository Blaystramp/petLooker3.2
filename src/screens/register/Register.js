import React, { useEffect } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import "./register.css";


import { register } from '../../services/actions/authAction'
import MiniLoader from "../../components/loading/MiniLoader";

const Register = ({ register, authLoading, history, isAuth }) => {

  useEffect(() => {
    if (isAuth === true) {
      history.push('/profile')
    }
  }, [isAuth, history])

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password2: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Nombre necesario"
          }
          if (!values.email) {
            errors.email = "Email requerido";
          }
          else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email inválido";
          }
          if (values.email == "admin@admin.com"){
            errors.email = "Email no disponible";
          }
          if (!values.password) {
            errors.password = "Contraseña requerida";
          } else if (values.password.length < 6) {
            errors.password = "La contraseña debe ser igual o mayor a 6 caracteres";
          }
          if (!values.password2) {
            errors.password2 = "Ingrese su contraseña de nuevo"
          }
          else if (values.password !== values.password2) {
            errors.password2 = "Password does not match"
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { name, email, password } = values
          register({ name, email, password }, history)
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
        }) => (
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-overlay">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="register-left">
                        <div className="register-left-overlay">
                          <a className="fb" href="/auth/facebook"> Ingresar con Facebook</a>
                          <a className="email" href="/auth/google"> Ingresar con Gmail</a>
                          <div className="name-section">
                            <input
                              type="text"
                              placeholder="Ingrese nombre"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            {errors.name && touched.name && (
                              <p className="error">{errors.name}</p>
                            )}
                          </div>
                          <div className="email-section">
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
                          <div className="password-section">
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
                          <div className="password-section">
                            <input
                              type="password"
                              placeholder="Confirmar contraseña"
                              name="password2"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password2}
                            />
                            {errors.password2 && touched.password2 && (
                              <p className="error">{errors.password2}</p>
                            )}
                          </div>
                          <button type="submit" className="register-btn">
                            Register {authLoading && <MiniLoader />}
                          </button>
                          <p className="ml-5" style={{ color: "#ffffff" }}>Ya estás registrado? <Link style={{ color: "#ffffff" }} to="/login">Ingresar aquí</Link></p>
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired,
  res: PropTypes.object,
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authLoading: state.auth.loading,
  res: state.auth.registerRes,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { register })(Register);
