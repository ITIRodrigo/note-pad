import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = ' Campo Requerido'
  } else if (values.username.length > 20 || values.username.length < 5) {
    errors.username = ' El Campo debe tener de 5-20 caracteres'
  }
  if (!values.email) {
    errors.email = ' Campo Requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ' email no valido'
  }
  if (!values.password) {
    errors.password = ' Campo Requerido'
  } else if (values.password.length < 8) {
    errors.password = ' Contraseñas demasiado corta, minimo 8 caracteres'
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = ' Campo Requerido'
  }else if (values.password_confirmation !== values.password){
    errors.password_confirmation = ' Las Contraseñas no coinciden'
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
        ((error && <span>{error}</span>))}
    </div>
  </div>
)

const SignupVal = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Nombre de Usuario"
      /><br/>
      <Field name="email" type="email" component={renderField} label="Correo Electronico" /><br/>
      <Field name="password" type="Password" component={renderField} label="Contraseña" /><br/>
      <Field name="password_confirmation" type="Password" component={renderField} label="Confirmar Contraseña" />
      <div><br/>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          Registrarme
        </button>
        <button className="btn btn-primary" type="button" disabled={pristine || submitting} onClick={reset}>
          Limpiar
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signupValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(SignupVal)
