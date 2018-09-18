import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Pagination from '../Pagination.js'
import { Link } from 'react-router-dom';

/*const Home = (props)=> {
	

	return(
		<div>
			<h2>Home</h2>
			{Posts}
		</div>
	)
}*/

class Home extends Component{

	componentDidMount(){
		this.props.dispatch1(this.props.pagination.page);
	}

	componentWillUnmount(){
		this.props.clear();
	}

	componentWillReceiveProps(next_props){
		if (next_props.pagination.page != this.props.pagination.page) {
			console.log(next_props.pagination.page);
			console.log(this.props.pagination.page);
			this.props.dispatch1(next_props.pagination.page);
		}
	}

	allPosts = ()=>{
		const Posts = this.props.allPosts.map((post)=>{
			if ((this.props.logi) && this.props.login.id == post.user_id) {
				<ul className="list-group">
					<Link to={`/${post.user_id}/post/${post.id}`} key={post.id}>
						<li className="list-group-item"><h4>{post.title}</h4></li>
					</Link>
				</ul>
			} else {
				return(
					<ul className="list-group">
						<Link to={`/post/${post.id}`} key={post.id}>
					<li className="list-group-item"><h4 key={post.id}>{post.title}</h4></li>
					</Link>
					</ul>
				)
			}
		});
		return Posts;
	}

	render(){
		return(
			<div className="container">
				{this.allPosts()}
				{<Pagination/>}
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return{
		allPosts: state.allPosts,
		login: state.login,
		pagination: state.pagination
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		dispatch1: (pagina) =>{
			//dispatch(actionCreator);
			axios.get(`https://blog-api-u.herokuapp.com/v1/posts?page=${pagina}`)
			.then(function(response) {
				//console.log(response);
				dispatch({type: "DATA_LOADED", 
				data: response.data});
			})
			.catch(function(error) {
				console.log(error);
			})
		},
		clear: ()=>{
			dispatch({type: "CLEAR_DATA"});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)