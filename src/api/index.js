import axios from 'axios'
import { topicsRes } from './resource.js'
import { newsRes } from './resource.js'
import { listnewsRes } from './resource.js'
import { articleRes } from './resource.js'


export default {
    getTopics(){
       return axios.get(topicsRes)
    },
    getnews(){
    	return axios.get(newsRes)
    },
    getlistNews(id){
    	return axios.get(listnewsRes+id)
    },
    getartical(id){
    	return axios.get(articleRes+id)
    } 
}