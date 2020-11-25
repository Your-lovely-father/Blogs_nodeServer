/**
 * Message model module.
 * @file 留言模型
 * @module model/message
 */

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');
import { timestampToTime } from '../util/util';
// 留言模型
const messageSchema = new mongoose.Schema({

	// 姓名
	name: { type: String, default: '' },

	// 头像
	avatar: { type: String, default: '' },

	//城市
	cname: { type: String, default: '' },

	// 留言内容
	content: { type: String, required: true },

	// 回复留言内容
	reply_list: [
		{
			content: { type: String, required: true },
			//0 用戶 1 博主
			state: { type: Number, default: 0 },
			//回复时间
			replyTime: { type: String, default:timestampToTime(new Date()) },
			// 姓名
			name: { type: String, default: '' },
			// 头像
			avatar: { type: String, default: '' },
			//城市
			cname: { type: String, default: '' },
		},
	],
	// 创建日期
	create_time: { type: String, default:timestampToTime(new Date())},

	// 最后修改日期
	update_time: { type: String, default:timestampToTime(new Date())},
});

// 自增ID插件配置
messageSchema.plugin(autoIncrement.plugin, {
	model: 'Message',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
// 留言模型
module.exports = mongoose.model('Message', messageSchema);
