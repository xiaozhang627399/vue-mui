

export default {
	changeload({commit},plan){
        var plan = plan.isloading;
       commit("CHANGELOAD",plan)
	}
}