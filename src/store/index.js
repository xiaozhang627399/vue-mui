import Vue from 'vue'
import Vuex from 'vuex'
// import Home from './views/Home.vue'
import mutations from './mutation.js'
import actions from './action.js'


Vue.use(Vuex)

const state ={
	isloading:true
}

export default new Vuex.Store({
	state,
	mutations,
	actions
	
})