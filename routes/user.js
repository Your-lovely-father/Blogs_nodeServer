const fetch = require('node-fetch');
const CONFIG = require('../app.config.js');
const User = require('../models/user');
const consola = require('consola') //日志工具
import { MD5_SUFFIX, responseClient, md5 } from '../util/util.js';

//登录
exports.login = (req, res) => {
  let { email, password } = req.body;
  if (!email) {
    responseClient(res, 400, 2, '用户邮箱不可为空');
    return;
  }
  if (!password) {
    responseClient(res, 400, 2, '密码不可为空');
    return;
  }
  User.findOne({
    email,
    password: md5(password + MD5_SUFFIX),
  })
    .then(userInfo => {
      if (userInfo) {
        //登录成功后设置session
        req.session.userInfo = userInfo;
        responseClient(res, 200, 0, '登录成功', userInfo);
      } else {
        responseClient(res, 400, 1, '用户名或者密码错误');
      }
    })
    .catch(err => {
      responseClient(res);
    });
};

//用户验证
exports.userInfo = (req, res) => {
  if (req.session.userInfo) {
    responseClient(res, 200, 0, '', req.session.userInfo);
  } else {
    responseClient(res, 200, 1, '请重新登录', req.session.userInfo);
  }
};

//退出登录
exports.logout = (req, res) => {
  if (req.session.userInfo) {
    req.session.userInfo = null; // 删除session
    responseClient(res, 200, 0, '登出成功！！');
  } else {
    responseClient(res, 200, 1, '您还没登录！！！');
  }
};
//注册
exports.register = (req, res) => {
  let { name, password, phone, email, introduce, type } = req.body;
  if (!email) {
    responseClient(res, 400, 2, '用户邮箱不可为空');
    return;
  }
  const reg = new RegExp(
    '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
  ); //正则表达式
  if (!reg.test(email)) {
    responseClient(res, 400, 2, '请输入格式正确的邮箱！');
    return;
  }
  if (!name) {
    responseClient(res, 400, 2, '用户名不可为空');
    return;
  }
  if (!password) {
    responseClient(res, 400, 2, '密码不可为空');
    return;
  }
  //验证用户是否已经在数据库中
  User.findOne({ email: email })
    .then(data => {
      if (data) {
        responseClient(res, 200, 1, '用户邮箱已存在！');
        return;
      }
      //保存到数据库
      let user = new User({
        email,
        name,
        password: md5(password + MD5_SUFFIX),
        phone,
        type,
        introduce,
      });
      user.save().then(data => {
        responseClient(res, 200, 0, '注册成功', data);
      });
    })
    .catch(err => {
      responseClient(res);
      return;
    });
};
