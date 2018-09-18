import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = ' Informacion Requerida'
  } else if (values.title.length < 10 || values.title.length > 30) {
    errors.title = 'El titulo debe contener de 10 a 30 caracteres'
  }
  if (!values.body) {
    errors.body = ' Informacion Requerida'
  } else if (values.body.length < 50 || values.body.length > 300) {
    errors.body =' El contenido debe ser de 50 a 300 caracteres'
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

const renderText = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} type={type}>
      </textarea>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let AEditarF = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Titulo"
      />
      <Field name="body" type="text" component={renderText} label="Contenido" />
      <div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          Agregar
        </button>
        <button className="btn btn-primary" type="button" disabled={pristine || submitting} onClick={reset}>
          Limpiar
        </button>
      </div>
    </form>
  )
}

AEditarF = reduxForm({
  form: 'AEditarF', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(AEditarF)

AEditarF = connect(
  (state)=>({
    initialValues: {
      title: state.editPost.title,
      body: state.editPost.body
    }
  })
)(AEditarF);

export default AEditarF;
