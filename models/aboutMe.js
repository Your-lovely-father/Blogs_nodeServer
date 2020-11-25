/**
 * Link model module.
 * @file 关于模型
 * @module model/aboutme
 */

const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

// 链接模型
const aboutmeSchema = new mongoose.Schema({

    // 标题名称
    name: { type: String},

    // 链接描述
    content: { type: String, default: '' },

    // 创建日期
    create_time: { type: Date, default: Date.now },

    // 最后修改日期
    update_time: { type: Date, default: Date.now },
});

// 自增ID插件配置
aboutmeSchema.plugin(autoIncrement.plugin, {
    model: 'aboutMe',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});

// 链接模型
module.exports = mongoose.model('aboutMe', aboutmeSchema);
