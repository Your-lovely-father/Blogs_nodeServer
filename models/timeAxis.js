/**
 * TimeAxis model module.
 * @file 时间轴模型
 * @module model/timeAxis
 */

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');
import { timestampToTime } from '../util/util';
// 时间轴模型
const timeAxisSchema = new mongoose.Schema({

	// 时间轴内容
	content: { type: String, required: true },
	// 创建日期
	create_time: { type: String, default:timestampToTime(new Date())},
});

// 自增ID插件配置
timeAxisSchema.plugin(autoIncrement.plugin, {
	model: 'TimeAxis',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 时间轴模型
module.exports = mongoose.model('TimeAxis', timeAxisSchema);
