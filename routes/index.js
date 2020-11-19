/*
*所有的路由接口
*/
const user = require('./user');
const link = require('./link');
const timeAxis = require('./timeAxis');

module.exports = app => {
	app.post('/login', user.login);
	app.post('/logout', user.logout);
	app.post('/register', user.register);

	app.post('/addLink', link.addLink);
	app.post('/updateLink', link.updateLink);
	app.post('/delLink', link.delLink);
	app.get('/getLinkList', link.getLinkList);

	app.post('/addTimeAxis', timeAxis.addTimeAxis);
	app.post('/updateTimeAxis', timeAxis.updateTimeAxis);
	app.post('/delTimeAxis', timeAxis.delTimeAxis);
	app.get('/getTimeAxisList', timeAxis.getTimeAxisList);
	// app.post('/getTimeAxisDetail', timeAxis.getTimeAxisDetail);

};
