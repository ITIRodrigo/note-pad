import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Ingrese Correo electronico'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'email invalido'
  }
  if (!values.password) {
    errors.password = 'Ingrese Contraseña'
  } else if (values.password.length < 8) {
    errors.password = ' Contraseñas demasiado corta, minimo 8 caracteres'
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const LoginF = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Correo electronico" /><br/>
      <Field name="password" type="password" component={renderField} label="Contraseña" /><br/>
      <div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          Entrar
        </button>
        <button className="btn btn-primary" type="button" disabled={pristine || submitting} onClick={reset}>
          Limpiar
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'loginValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(LoginF)
