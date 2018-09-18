import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './Initial/Home.js';
import Login from './Initial/Login.js';
import Signup from './Initial/Signup.js';
import { connect } from 'react-redux';
import AHeader from './Auth/AHeader.js';
import Post from './Initial/Post.js';
import AMisPosts from './Auth/AMisPosts.js'
import ACrear from './Auth/ACrear.js'
import AEditar from './Auth/AEditar.js'


if (localStorage.getItem("email")) {  
 console.log("Hola Mundo",localStorage.getItem("email"));
}
const Header = () =>{
  return (
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to='/'>Home </Link></li>
    <li className="breadcrumb-item"><Link to='/signup'> Registrarse </Link></li>
    <li className="breadcrumb-item active" aria-current="page"><Link to='/login'> Entrar</Link></li>
  </ol>
</nav>
  )
}

const App = (props)=>{
  console.log(props.login);
  if (props.login!=null) {
    return(
      <Router>
        <div>
          <AHeader/>
          <Route exact path="/" component={Home}/>
          <Route path="/post/:id" component={Post}/>
          <Route path="/:user/posts" component={AMisPosts}/>
          <Route path="/:user/crear" component={ACrear}/>
          <Route exact path="/:user/post/:id" component={Post}/>
          <Route path="/:user/post/:id/editar" component={AEditar}/>
        </div>
      </Router>
      )
  }else{
    return(
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Home}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route path="/post/:id" component={Post}/>
        </div>
      </Router>
    ) 
  }

}

const mapStateToProps = (state) =>{
  return{
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    dispatch1:() => {
      //dispatch();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);