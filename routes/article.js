import {responseClient} from '../util/util';
import article from '../models/article';
import Link from "../models/link";

//获取全部文章
exports.getArticleList = (req, res) => {
    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;
    let conditions = {};
    let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
    let responseData = {
        count: 0,
        list: [],
    };
    article.countDocuments({}, (err, count) => {
        if (err) {
            console.error('Error:' + err);
        } else {
            responseData.count = count;
            // 待返回的字段
            let fields = {
                title: 1,
                tags: 1,
                desc: 1,
                top: 1,
                img_url: 1,
                origin: 1,
                create_time: 1
            };
            let options = {
                skip: skip,
                limit: pageSize,
                sort: {create_time: -1},
            };
            article.find(conditions, fields, options, (error, result) => {
                if (err) {
                    console.error('Error:' + error);
                } else {
                    responseData.list = result;
                    responseClient(res, 200, 0, '操作成功！', responseData);
                }
            });
        }
    });
};
//添加
exports.addArticle = (req, res) => {
    let {_id, title, tags, desc, top, img_url, origin} = req.body;
    article.findOne({
        _id,
    })
        .then(result => {
            if (!result) {
                let Article = new article({
                    title,
                    tags,
                    desc,
                    top,
                    img_url,
                    origin,
                });
                Article
                    .save()
                    .then(data => {
                        responseClient(res, 200, 0, '操作成功！', data);
                    })
                    .catch(err => {
                        console.error('err :', err);
                        // throw err;
                    });
            } else {
                responseClient(res, 200, 1, '该时间轴内容已存在');
            }
        })
        .catch(errro => {
            console.error('errro :', errro);
            responseClient(res);
        });
};
//删除
exports.delArticle = (req, res) => {
    let {id} = req.body;
    article.deleteMany({_id: id})
        .then(result => {
            if (result.n === 1) {
                responseClient(res, 200, 0, '操作成功!');
            } else {
                responseClient(res, 200, 1, '时间轴内容不存在');
            }
        })
        .catch(err => {
            console.error('err :', err);
            responseClient(res);
        });
};
//修改
exports.updateArticle = (req, res) => {
    const {id, top} = req.body;
    let updateStr = {$set: {"top": top}};
    article.updateOne({_id: id}, updateStr).then(result => {
        responseClient(res, 200, 0, '操作成功', result);
    })
        .catch(err => {
            console.error(err);
            responseClient(res);
        });
};


//详情添加
exports.addReplyArticle = (req, res) => {
    let {id, author, content, link,} = req.body;
    console.log(req.body)
    article.findById({
        _id: id,
    })
        .then(result => {
            let list = result.details_list;
            let item = {
                author: author,
                content: content,
                link: link,
            };
            list.push(item)
            article.update(
                {_id: id},
                {
                    details_list: list,
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
// 详情
exports.getArticleDetail = (req, res) => {
    let {id} = req.body;
    article.findOne({_id: id})
        .then(data => {
            responseClient(res, 200, 0, '操作成功！', data);
        })
        .catch(err => {
            console.error('err :', err);
            responseClient(res);
        });
};
