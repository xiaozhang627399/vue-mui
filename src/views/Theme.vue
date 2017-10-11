<template>
	<div>
	  <div>
	  	<img :src="newsdata.background" style="max-height:300px;min-height:300px;width:100%">
	  </div>
	  <div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for = 'x in newslist' @click = 'goarticle(x)'>
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" :src='x.images'>
					<div class="mui-media-body">
						<p class='mui-ellipsis'>
							{{x.title}}
						</p>
					</div>
				</a>
			</li>
	    </ul>
	   </div>
	</div>
</template>

<script>
    import api from '@/api/index.js'
    import { mapState } from 'vuex'

	export default {
		name:'theme',
		data(){
			return {
				newslist:[],
				newsid : '',
				newsdata:{}
			}
		},
		mounted(){
            this.newsid = this.$route.query.id;
		},
		computed:{
       ...mapState([
           'isloading'
       	])
    },
		methods:{
			getList(){
			   const that = this;
               api.getlistNews(that.newsid).then(function(data){
               	    that.$store.dispatch('changeload',{
			          isloading:false
			        });
                   that.newslist = data.data.stories,
                   that.newsdata = data.data;
                })
			},
			goarticle(x){
				 this.$store.dispatch('changeload',{
		          isloading:true
		        });
				this.$router.push({
		          path: 'article',
		          query : {
		            id : x.id ||''
		          }
		        });
			}
		},
		watch:{
			newsid(){
				this.getList()
			},
			'$route.query.id'(){
				this.newsid = this.$route.query.id;
				this.getList()
			}
		}
	}
</script>

<style>
	
</style>