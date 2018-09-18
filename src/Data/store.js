import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const allPosts = (state=[], action)=>{
	 var nuevoEstado = Object.assign({}, state);
	 switch(action.type){
	 	case 'DATA_LOADED':
	 		nuevoEstado = action.data;
	 			return nuevoEstado;

	 	case 'CLEAR_DATA':
	 		nuevoEstado =[];
	 			return nuevoEstado;
	 	default:
	 		return state;
	 }
}

const userCreated = (state={},action) =>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'USER_CREATED':
			nuevoEstado = {mensaje: "El usuario se creo correctamente"}
			return nuevoEstado;
		case 'USER_ERROR':
			nuevoEstado = {mensaje: "Error al registrar al usuario o datos ingresados de forma erronea"}
			return nuevoEstado;
		default:
			return {};
	}
}

const session = (state=null,action)=>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'LOGIN':
			nuevoEstado = action.data;
			return nuevoEstado;
		case 'LOGOUT':
			nuevoEstado = null;
			return nuevoEstado;

		default:
			return state;
	}
}

const pagination = (state={total: 1, page: 1}, action) => {
	var nuevoEstado = Object.assign({},state);
		switch(action.type){
		case 'SET_TOTAL':
			nuevoEstado.total = action.total;
			return nuevoEstado;
		case 'SET_CURRENT':
			nuevoEstado.page = action.page;
			return nuevoEstado;
		default:
			return state;
		}
}

const showPost = (state={},action) =>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'GET_POST':
			nuevoEstado = action.data
			return nuevoEstado;
		case 'CLEAR_POST':
			nuevoEstado = {};
			return nuevoEstado;
		default:
			return state;
	}
}

const errorPost = (state=null,action)=>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'ERROR_GET_POST':
			nuevoEstado = "Post no encontrado";
			return nuevoEstado;
		default:
			return null;
	}
}

const create = (state=null,action) =>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'CREATED_':
			nuevoEstado = "Post Agregado!!";
			return nuevoEstado;
		case 'ERROR_CREATED_':
			nuevoEstado = "Error al Agregar el Post";
			return nuevoEstado;
		default:
			return null;
	}
}

const personalPost = (state=[],action)=>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'PERSONAL_POSTS':
			nuevoEstado = action.data;
			return nuevoEstado;
		case 'CLEAR_PERSONAL':
			nuevoEstado = [];
			return nuevoEstado;
		default:
			return state;
	}
}

const errorPersonal = (state=null,action)=>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'ERROR_PERSONAL':
			nuevoEstado = "Vacio";
			return nuevoEstado;
		default:
			return null;
	}
}

const editPost = (state={},action) =>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'GET_POST':
			nuevoEstado = action.data
			return nuevoEstado;
		case 'CLEAR_EDIT':
			nuevoEstado = {};
			return nuevoEstado;
		default:
			return state;
	}
}

const mensajeEditar = (state=null,action)=>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'EDITED':
			nuevoEstado = "Post editado correctamente";
			return nuevoEstado;
		case 'ERROR_EDITED':
			nuevoEstado = "Error al actualizar el Post";
			return nuevoEstado;
		default:
			return null;
	}
}

const mensajeEliminar = (state=null,action)=>{
	var nuevoEstado = Object.assign({},state);
	switch(action.type){
		case 'ELIMINATED':
			nuevoEstado = "Post eliminado correctamente";
			return nuevoEstado;
		case 'ERROR_ELIMINATED':
			nuevoEstado = "Error al eliminar el Post";
			return nuevoEstado;
		default:
			return null;
	}
}

const reducer = combineReducers({
	allPosts: allPosts,
	form: formReducer,
	userStatus: userCreated,
	pagination: pagination,
	login: session,
	showPost: showPost,
	errorPost: errorPost,
	create: create,
	personalPost: personalPost,
	errorPersonal: errorPersonal,
	editPost: editPost,
	mensajeEditar: mensajeEditar,
	mensajeEliminar: mensajeEliminar
});

const store = createStore(reducer);

export default store;