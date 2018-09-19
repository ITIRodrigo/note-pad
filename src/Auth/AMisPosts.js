import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';



class AMisPosts extends Component{

componentDidMount(){
	this.props.getPosts(this.props.login.id, this.props.login.jwt);
}

componentWillUnmount(){
	this.props.clear();
}


posts = () =>{
var misPosts;
	if (this.props.posts.length !==0)
	{
		misPosts = this.props.posts.map((p)=>{
			return(
				<div>
				<ul className="list-group">
					<Link to={`/${p.user_id}/post/${p.id}`} key={p.id}><li className="list-group-item">{p.title}</li></Link>
				</ul>
				</div>

			)
		})
	} else {
		misPosts = null;
	}
	return misPosts;
}
	render(){
		return(
		<div className="container">
			<div className="jumbotron">
				<h2 align="center">Trabajo feo :v</h2>
			</div>
			<h2>Lista de Posts</h2>
			<Link to={`/${this.props.login.id}/crear`}><button className="btn btn-success">Crear Nuevo Post</button></Link><br/><br/>
			{this.posts()}
			{this.props.error}
		</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return{
		login:state.login,
		posts:state.personalPost,
		error: state.errorPersonal,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		getPosts:(user_id,token)=>{
			let config = {'Authorization': 'Bearer' + token};
			axios.get(`https://blog-api-u.herokuapp.com/users/${user_id}/posts`,
			{
				headers: config
			})
			.then(function(response)
			{
				console.log(response);
				dispatch({type: 'PERSONAL_POSTS', data: response.data.posts});
			})
			.catch(function(error)
			{
				console.log(error);
				dispatch({ type: 'ERROR_PERSONAL'});
			})
		},
		clear: () =>{
			dispatch({type: 'CLEAR_PERSONAL'});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AMisPosts);
