// 引入 express 模块
const express = require('express');
// 引入 body-parser 模块
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');





// 创建服务器
const app = express();


// 创建中间件
app.use(bodyParser.urlencoded({ extended: false }))
    // 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs');

// 设置模板页面的存放路径
app.set('views', './views');

//  静态资源托管 文件
app.use('/node_modules', express.static('node_modules'));

// 监听客户端的请求 首页
// const result1 = require('./router/index.js');

// app.use(result1);
// // 导入 用户相关的 路由
// const result2 = require('./router/user.js');

// app.use(result2);

// 使用循环的方式 动态 进行路由的注册
// 1先读取文件
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
    //  2 判断是否读取成功
    if (err) return console.log('读取 router 文件目录失败');
    // 3循环 router 目录下的每一个文件名
    filenames.forEach(fname => {
        // 每循环一次，就拼接出一个完整的路由模块地址
        // 然后使用 require 导入这个模块
        console.log(path.join(__dirname, './router', fname));
        const router = require(path.join(__dirname, './router', fname));

        app.use(router);
    });
});

// 创建端口号 并启动服务器
app.listen(3000, () => {
    console.log("服务器运行成功……");
});