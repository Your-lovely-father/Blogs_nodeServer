/**
 * TimeAxis model module.
 * @file 文章发布
 * @module model/article
 */
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');
import { timestampToTime } from '../util/util';
// 文章
const articleSchema = new mongoose.Schema({
    // 文章标题
    title: { type: String, required: true},
    // 文章标签
    tags: { type: String, default: '' },
    // 文章描述
    desc: { type: String, default: '' },
    //置顶
    top: { type: Number, default: 0 },
    // 封面图
    img_url: { type: String, default: 'https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240' },
    // 文章转载状态 => 1 原创，2 转载
    origin: { type: Number, default: 1 },
    // 详情
    details_list: [
        {
            // 作者
            author: { type: String, required: true,},
            // 文章内容
            content: { type: String, required: true,},
            // 文章链接
            link: { type: String, required: true,},
        },
    ],
    // 创建日期
    create_time: { type: String, default:timestampToTime(new Date())},
});

// 自增ID插件配置
articleSchema.plugin(autoIncrement.plugin, {
    model: 'Article',
    field: 'id',
    startAt: 1,
    incrementBy: 1,
});

// 文章模型
module.exports = mongoose.model('Article', articleSchema);
