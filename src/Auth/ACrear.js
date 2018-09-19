import React from 'react';
import AFormPost from './AFormPost.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

const ACrear = (props)=>{

	const manejoDeForma =(data)=>{
		console.log(data);
		let config = {'Authorization': 'Bearer' + props.login.jwt}
		axios.post('https://blog-api-u.herokuapp.com/v1/posts',
		{
			post:
			{
				title: data.title,
				body: data.body
			}
		},
		{
			headers: config
		})
		.then(function(response) {
			console.log(response);
			props.creado();
		})
		.catch(function(error){
			console.log(error);
			props.error();
		})
	}
	return(
		<div className="container">
			<div className="jumbotron">
				<h2 align="center">NEW POST</h2>
			</div>
			<div className="col-md-6">

			</div>
			<div className="col-md-6">
				<div className="panel panel-info">
					<div className="panel-heading">

						<h4>{props.mensaje}</h4>
						<AFormPost onSubmit={manejoDeForma}/>
					</div>

				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state)=>{
	return{
		login: state.login,
		mensaje: state.create
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		creado: () => {
			dispatch(reset('AFormPost'));
			dispatch({type: 'CREATED_'});
		},
		error: () => {
			dispatch({type: 'ERROR_CREATED_'});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ACrear);
