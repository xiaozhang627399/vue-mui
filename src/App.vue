<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav zh-header">
      <a v-if = 'true' class="mui-icon mui-icon-bars mui-pull-right" @click = 'clickdowm()'></a>
      <a v-if = 'false' class="mui-icon mui-icon-back mui-pull-left"></a> 
      <h1 class="mui-title" >{{title}}</h1>     
     </header>
     <div id="menu-wrapper" class="menu-wrapper hidden">
      <div id="menu" class="menu">
        <ul class="mui-table-view mui-table-view-inverted">
          <li class="mui-table-view-cell">
            <a href="javascript:;">首页</a>
          </li>
          <li class="mui-table-view-cell" v-for = "x in topicsList" @click = "clickli(x)" :themeid = 'x.id'>
            <a href="javascript:;" >{{x.name}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="menu-backdrop" class="menu-backdrop" @click="backdrop()"></div>

    <div class="mui-content box-content">
        <transition :name="transitionName">
          <!-- <keep-alive> -->
            <router-view class="app-view"></router-view>
          <!-- </keep-alive> -->
        </transition>
    </div> 
  </div>
</template>

<script>
// import './assets/mui/js/mui.js'
// import mui from './assets/mui/js/mui.min.js'

// console.log(mui)
import axios from 'axios'
import api from '@/api/index.js'

// console.log(axios)
export default {
  name: 'app',
  mounted(){
     var that = this;
     that.title = '首页'; 
     api.getTopics().then(function(data) {
        that.topicsList = data.data.others;
      })
  },
  data(){
    return {
      topicsList:[],
      showdowm:false,
      transitionName:'slide-left',
      themeid:'',
      title:''
      }
    },
  watch:{
    '$route' (to, from) {
      let vue = this;
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      vue.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      // to.path == '/' && this.num != 1 && this.$store.commit('add', 1);
      // this.transitionName = to.path != "/article" ? 'slide-right' : 'slide-left';
    }
  },
  methods:{
    clickdowm(){
      var that = this;
      var menuWrapper = document.getElementById("menu-wrapper");
      var menu = document.getElementById("menu");
      var menuWrapperClassList = menuWrapper.classList;
      var backdrop = document.getElementById("menu-backdrop");

      if (that.showdowm) {
          return;
        }
        that.showdowm = true;
        if (menuWrapperClassList.contains('mui-active')) {
          document.body.classList.remove('menu-open');
          menuWrapper.className = 'menu-wrapper fade-out-up animated';
          menu.className = 'menu bounce-out-up animated';
          setTimeout(function() {
            backdrop.style.opacity = 0;
            menuWrapper.classList.add('hidden');
          }, 500);
        } else {
          document.body.classList.add('menu-open');
          menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
          menu.className = 'menu bounce-in-down animated';
          backdrop.style.opacity = 1;
        }
        setTimeout(function() {
          that.showdowm = false;
        }, 500);
    },
    backdrop(){
      this.clickdowm();
    },
    clickli(x){
      this.clickdowm();
      this.title = x.name;
      this.$router.push({
          path: 'theme',
          query : {
            id : x.id ||''
          }
        });
    }
  }
}

</script>

<style>
@import "../src/assets/app.css";
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}*/
.zh-header{
  /*opacity: 0.5;*/
  background: rgba(0,0,0,0.5);
}
.zh-header .mui-title{
  color:white;
}

.mui-bar-nav ~ .box-content{
  padding-top: 0;
}
</style>
