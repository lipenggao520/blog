const express = require('express');

// const app = express();
const router = express.Router();



const ctrl = require('../controaaer/user.js');

// 监听客户请求 登录页面
router.get('/register', ctrl.getRegister);

// 监听客户端的 登录页面请求
router.get('/login', ctrl.getLogin);

// 用户注册 请求
router.post('/register', ctrl.postRegister);

router.post('/login', ctrl.getLogin);


module.exports = router;