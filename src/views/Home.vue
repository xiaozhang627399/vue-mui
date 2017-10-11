<template>
<div>
    <div id="slider" class="mui-slider"  ref='slider'>
		<div class="mui-slider-group mui-slider-loop">
			<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
			<div class="mui-slider-item mui-slider-item-duplicate">
				<a href="#">
					<img :src="imageslistfirst">
				</a>
			</div>
			<!-- 第一张 -->
			<div class="mui-slider-item" v-for='x in imageslist' >
				<a href="#">
					<img :src="x.image">
				</a>
			</div>
			
			<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
			<div class="mui-slider-item mui-slider-item-duplicate">
				<a href="#">
					<img :src="imageslistend">
				</a>
			</div>
		</div>
		<div class="mui-slider-indicator">
			<div class="mui-indicator mui-active"></div>
			<div class="mui-indicator"></div>
			<div class="mui-indicator"></div>
			<div class="mui-indicator"></div>
			<div class="mui-indicator"></div>
		</div>
	</div>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for = 'x in datalist' @click = 'goarticle(x)'>
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
  name:'home',
  data(){
  	return {
  		datalist:[],
  		imageslist:[],
  		imageslistend:'',
  		imageslistfirst:''
  	}
  },
  computed:{
       ...mapState([
           'isloading'
       	])
    },
  mounted(){
  	const that = this;
  	// alert(this.isloading)
    api.getnews().then(function(data){
        that.$store.dispatch('changeload',{
          isloading:false
        })

    	// console.log(data.data.top_stories[0].image)
    	that.datalist = data.data.stories;
    	that.imageslist = data.data.top_stories;
        that.imageslistend = that.imageslist[0].image;
        that.imageslistfirst = that.imageslist[that.imageslist.length-1].image;
       	
    });
    mui("#slider").slider({
		interval: 2000
	});
    

  },
  methods:{
  	goarticle(x){
  		this.$store.dispatch('changeload',{
          isloading:true
        })
			this.$router.push({
	          path: 'article',
	          query : {
	            id : x.id ||''
	          }
	        });
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/home.css";

</style>