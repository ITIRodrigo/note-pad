import React from 'react';
import LoginF from './LoginF.js';
import axios from 'axios';
import { connect } from 'react-redux';

const Login = (props)=> {

	const funcProps = ()=>{
		console.log(props.own);
	}

	const funcionForma = (datos) =>{
		console.log(datos);
		axios.post('https://blog-api-u.herokuapp.com/v1/login', {
			login:{
				email: datos.email,
				password: datos.password
			}
		})
		.then(function (response) {
			console.log(response);
			props.login(response.data);
			props.history.push('/');
			//guardar sesion storage
			localStorage.setItem("email", response.data.email);
			localStorage.setItem("id", response.data.id);
			localStorage.setItem("token", response.data.jwt);
			localStorage.setItem("name", response.data.name);

		})
		.catch(function (error) {
			console.log(error);
			props.errorLogin();
		})
	} 
	return(
		<div className="container">
			{funcProps()}
			<div className="col-md-3">
				
			</div>
			<div className="col-md-6">
				<div className="panel panel-primary">
					<div className="panel-heading"><h2 align="center">Login</h2></div>
					<div className="panel-body">
						{props.prop.mensaje}
						<br/>
						<LoginF onSubmit={funcionForma}/>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state,ownProps) =>{
	return{
		prop: state.userStatus,
		own: ownProps
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		login: (datos) => {
			dispatch({type: 'LOGIN',
		data: datos});
		},
		errorLogin: () =>{
			dispatch({type: 'USER_ERROR'});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)