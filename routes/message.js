import { responseClient } from '../util/util';
import Message from '../models/message';

//获取全部留言
exports.getMessageList = (req, res) => {
	let pageNum = parseInt(req.query.pageNum) || 1;
	let pageSize = parseInt(req.query.pageSize) || 10;
	let conditions = {};
	let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
	let responseData = {
		count: 0,
		list: [],
	};
	Message.countDocuments({}, (err, count) => {
		if (err) {
			console.error('Error:' + err);
		} else {
			responseData.count = count;
			// 待返回的字段
			let fields = {
				name: 1,
				avatar: 1,
				content: 1,
				cname: 1,
				create_time:1,
				state:1
			};
			let options = {
				skip: skip,
				limit: pageSize,
				sort: { create_time: -1 },
			};
			Message.find(conditions, fields, options, (error, result) => {
				if (err) {
					console.error('Error:' + error);
					// throw error;
				} else {
					responseData.list = result;
					responseClient(res, 200, 0, 'success', responseData);
				}
			});
		}
	});
};

// 添加留言
exports.addMessage = (req, res) => {
	let { id, content, avatar, name, cname } = req.body;
	// 如果用户已经注册的，保存用户的信息，再保存留言内容
	if (id) {
		Message.findById({
			_id: id,
		})
			.then(result => {
				if (result) {
					let message = new Message({
						id: result._id,
						name: name ? name : result.name,
						avatar: result.avatar,
						content: content,
						cname:cname,
					});
					message
						.save()
						.then(data => {
							responseClient(res, 200, 0, '添加成功', data);
						})
						.catch(err => {
							console.error('err :', err);
							throw err;
						});
				} else {
				}
			})
			.catch(error => {
				console.error('error :', error);
				responseClient(res);
			});
	} else {
		// 直接保存留言内容
		let message = new Message({
			name: name,
			avatar:avatar,
			content: content,
			cname: cname,
		});
		message
			.save()
			.then(data => {
				responseClient(res, 200, 0, '添加成功', data);
			})
			.catch(err2 => {
				console.error('err 2:', err2);
				throw err;
			});
	}
};

// 删除
exports.delMessage = (req, res) => {
	let { id } = req.body;
	Message.deleteMany({ _id: id })
		.then(result => {
			// console.log('result :', result)
			if (result.n === 1) {
				responseClient(res, 200, 0, '删除成功!');
			} else {
				responseClient(res, 200, 1, '留言不存在或者已经删除！');
			}
		})
		.catch(err => {
			console.error('err :', err);
			responseClient(res);
		});
};

// 详情
exports.getMessageDetail = (req, res) => {
	let { id } = req.body;
	Message.findOne({ _id: id })
		.then(data => {
			responseClient(res, 200, 0, '操作成功！', data);
		})
		.catch(err => {
			console.error('err :', err);
			responseClient(res);
		});
};

// 回复留言
exports.addReplyMessage = (req, res) => {
	let { id,  content ,cname ,state,replyTime,name,avatar} = req.body;
	console.log(req.body)
	Message.findById({
		_id: id,
	})
		.then(result => {
			let list = result.reply_list;
			let item = {
				content: content,
				cname:cname,
				replyTime:replyTime,
				state:state,
				name:name,
				avatar:avatar,
				id:list.id,
			};
			list.push(item);
			Message.update(
				{ _id: id },
				{
					reply_list: list,
				},
			)
				.then(data => {
					responseClient(res, 200, 0, '操作成功', data);
				})
				.catch(err1 => {
					console.error('err1:', err1);
					responseClient(res);
				});
		})
		.catch(error2 => {
			console.error('error2 :', error2);
			responseClient(res);
		});
};
