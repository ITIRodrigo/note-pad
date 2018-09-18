import React, { Component } from 'react';
import AEditarF from './AEditarF.js';
import { connect } from 'react-redux';
import axios from 'axios';

class AEditar extends Component{

	componentWillUnmount(){
		this.props.clear();
	}

	manejoDatos = (data) =>{
		this.props.editar(data, this.props.edit.id, this.props.login.jwt);
	}
	render(){
		return(
			<div>
				<div className="container">
					<div className="jumbotron">
						<h2 align="center">Editar Post</h2>
					</div>
					<div className="col-md-3">
						
					</div>
					<div className="col-md-6">
						<div className="panel panel-info">
							<div className="panel-heading">
								<p>{this.props.mensaje}</p>
								<AEditarF onSubmit={this.manejoDatos}/>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return{
		edit: state.editPost,
		login: state.login,
		mensaje: state.mensajeEditar
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		clear: () => {
			dispatch({type: 'CLEAR_EDIT'});
		},
		editar: (data, idPost, token) =>{
			console.log(data);
			let config = {'Authorization': 'Bearer' + token}
			axios.patch(`https://blog-api-u.herokuapp.com/v1/posts/${idPost}`,{
			post:{
					title: data.title,
					body: data.body
				}	
			},
			{
				headers: config
			})
			.then(function (response) {
				console.log(response);
				dispatch({type: 'EDITED'});
			})
			.catch(function(error) {
				console.log(error);
				dispatch({type: 'ERROR_EDITED'});
			})

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AEditar);