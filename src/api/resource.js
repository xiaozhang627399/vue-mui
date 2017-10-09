 
const url_config = 'https://zhihu-agent.herokuapp.com/get?api='; 
const api_zhihu ={
	topics:'/4/themes',
	news: '/4/news/latest',
	listnews:'/4/theme/',
	article: '/4/news/'
};

export const topicsRes = url_config+api_zhihu.topics;
export const newsRes = url_config+api_zhihu.news;
export const listnewsRes = url_config+api_zhihu.listnews;
export const articleRes = url_config+api_zhihu.article;