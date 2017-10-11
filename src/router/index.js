import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Theme from '@/views/Theme'
import Article from '@/views/Article'

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path : '/theme',
    	name : 'theme',
    	component : Theme
    },
    {
    	path:'/article',
    	name:'article',
    	component: Article
    },
    {
      path:'*',
      redirect:Home
    }
  ]
})
