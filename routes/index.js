/*
*所有的路由接口
*/
const user = require('./user');
const link = require('./link');
const timeAxis = require('./timeAxis');
const aboutMe = require('./aboutMe')
const message = require('./message');
const article = require('./article');
module.exports = app => {
	//登录注册退出
	app.post('/login', user.login);
	app.post('/logout', user.logout);
	app.post('/register', user.register);

	//友情链接
	app.post('/addLink', link.addLink);
	app.post('/updateLink', link.updateLink);
	app.post('/delLink', link.delLink);
	app.get('/getLinkList', link.getLinkList);

	//时间戳
	app.post('/addTimeAxis', timeAxis.addTimeAxis);
	app.post('/delTimeAxis', timeAxis.delTimeAxis);
	app.get('/getTimeAxisList', timeAxis.getTimeAxisList);

	//关于我
	app.post('/addAboutMe', aboutMe.addAboutMe);
	app.post('/delAboutMe', aboutMe.delAboutMe);
	app.get('/getAboutMe', aboutMe.getaboutMeList);

	//留言
	app.post('/addMessage', message.addMessage);
	app.post('/addReplyMessage', message.addReplyMessage);
	app.post('/delMessage', message.delMessage);
	app.post('/getMessageDetail', message.getMessageDetail);
	app.get('/getMessageList', message.getMessageList);

	//文章发布
	app.post('/addArticle', article.addArticle);
	app.post('/delArticle', article.delArticle);
	app.post('/updateArticle', article.updateArticle);
	app.post('/addReplyArticle', article.addReplyArticle);
	app.get('/getArticleList', article.getArticleList);
	app.post('/getArticleDetail', article.getArticleDetail);
};
