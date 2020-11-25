import {responseClient} from '../util/util';
import aboutMe from '../models/aboutMe';

//获取列表
exports.getaboutMeList = (req, res) => {
    let pageNum = parseInt(req.query.pageNum) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;
    let conditions = {};
    let skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
    let responseData = {
        count: 0,
        list: [],
    };
    aboutMe.countDocuments(conditions, (err, count) => {
        if (err) {
            console.error('Error:' + err);
        } else {
            responseData.count = count;
            // 待返回的字段
            let fields = {
                _id: 1,
                name: 1,
                content:1
            };
            let options = {
                skip: skip,
                limit: pageSize,
                sort: {create_time: -1},
            };
            aboutMe.find(conditions, fields, options, (error, result) => {
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
//添加
exports.addAboutMe = (req, res) => {
    let {name, content} = req.body;
    console.log(name)
    console.log(content)
    aboutMe.findOne({
        name,
    }).then(result => {
        console.log(result)
            if (!result) {
                let aboutme = new aboutMe({
                    name,
                    content,
                });
                aboutme
                    .save()
                    .then(data => {
                        responseClient(res, 200, 0, '添加成功', data);
                    })
                    .catch(err => {
                        throw err;
                    });
            } else {
                responseClient(res, 200, 1, '内容已存在');
            }
        }).catch(err => {
            responseClient(res);
        });
};
//删除
exports.delAboutMe = (req, res) => {
    let {id} = req.body;
    aboutMe.deleteMany({_id: id})
        .then(result => {
            if (result.n === 1) {
                responseClient(res, 200, 0, '删除成功!');
            } else {
                responseClient(res, 200, 1, '内容不存在');
            }
        })
        .catch(err => {
            console.error(err);
            responseClient(res);
        });
};
