import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AHeader = (props) =>{
	return(
		<div>
			<nav aria-label="breadcrumb">
			  <ol className="breadcrumb">
			    <li className="breadcrumb-item"><Link to="/">Home </Link></li>
			    <li className="breadcrumb-item"><Link to={`/${props.login.id}/posts`}> Mis Posts </Link></li>
			    <li className="breadcrumb-item active" aria-current="page"><Link to="/" onClick={props.logout}> Salir</Link></li>
			  </ol>
			</nav>
		</div>
	)
}

const mapStateToProps = (state)=>{
	return {
		login: state.login
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		logout: () => {
			dispatch({type: 'LOGOUT'});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AHeader)

