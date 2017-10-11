<template>
	<div>
	  <div v-if = 'data.images'>
	  	<img :src="data.images" style="max-height:300px;min-height:300px;width:100%">
	  </div>
	  <div v-html="data.body">
	  </div>
	</div>
</template>

<script>
    import api from '@/api/index.js'
    import { mapState } from 'vuex'

	export default {
		name:'article',
		data(){
			return {
				data:[],
				articleid:''
			}
		},
        mounted(){
           this.articleid = this.$route.query.id
        },
        computed:{
       ...mapState([
           'isloading'
       	])
    },
        methods:{
        	getList(){
			   const that = this;
               api.getartical(that.articleid).then(function(data){
	               	that.$store.dispatch('changeload',{
			          isloading:false
			        });
                   that.data = data.data;
                })
			},
        },
        watch:{
        	articleid(){
        		this.getList();
        	},
        	'$route.query.id'(){
				this.articleid = this.$route.query.id;
				this.getList()
			}
        }
	}
</script>

<style>
</style>