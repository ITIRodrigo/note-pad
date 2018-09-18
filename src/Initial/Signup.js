import React from 'react';
import SignupVal from './SignupVal.js';
import axios from 'axios';
import { connect } from 'react-redux';
import {reset} from 'redux-form';

const Signup = (props)=> {
	const funcionForma = (datos)=>{
		console.log(datos);
		axios.post('https://blog-api-u.herokuapp.com/users/',{ 
			user:{
				name: datos.username,
				email: datos.email,
				password: datos.password,
				password_confirmation: datos.password_confirmation
			}
		})
		.then(function(response){
			console.log(response);
			props.success();
		})
		.catch(function(error){
			console.log(error);
			props.error();
		})
	}
	return(
		<div className="container">
			<div className="col-md-3">
				
			</div>
			<div className="col-md-6">
				<div className="panel panel-primary">
					<div className="panel-heading"><h5 align="center">Sign Up</h5></div>
					<div className="panel-body">
						{props.mensaje.mensaje}
						<br/>
						<SignupVal onSubmit={funcionForma} />
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) =>{
	return{
		mensaje: state.userStatus
	}
}

const mapDispatchToProps = (dispatch, ownProps) =>{
	return{
		success: () => {
			dispatch({type: 'USER_CREATED'});
			dispatch(reset('signupValidation'));
		},
		error: () => {
			dispatch({type: 'USER_ERROR'});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)