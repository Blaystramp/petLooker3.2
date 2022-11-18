import React, { useEffect } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../services/actions/authAction'
import "./login.css";
import MiniLoader from "../../components/loading/MiniLoader";

const Login = ({ login, history, isAuth, authLoading }) => {

  useEffect(() => {
    if (isAuth === true) {
      history.push('/profile')
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
          if (values.email == "admin@admin.com"){
            errors.email = "Email no disponible";
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
          login({ email, password }, history)
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
                          <a className="fb" href="/auth/facebook"> Entrar con Facebook</a>
                          <a className="email" href="/auth/google"> Entrar con Gmail</a>
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
                          <p className="ml-5" style={{ color: "#ffffff" }}>¿No estás registrado?   <Link style={{ color: "#ffffff" }} to="/register">Regístrate aquí</Link></p>
                          <p className="ml-5" style={{ color: "#ffffff" }}>¿Olvidaste tu contraseña?   <Link style={{ color: "#ffffff" }} to="/forget-pass">Ingresa aquí</Link></p>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authLoading: state.auth.loading,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
