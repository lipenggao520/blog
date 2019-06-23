// 引入 express 模块
const express = require('express');
// 创建服务器
const app = express();

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs');
// 设置模板页面的存放路径
app.set('views', './views');
//  静态资源托管 文件
app.use('/node_modules', express.static('node_modules'));

// 监听客户端的请求 首页
app.get('/', (req, res) => {
    res.render('index', {});
});
// 监听客户请求 登录页面
app.get('/register', (req, res) => {
    // 返回注册页面 
    res.render('register.ejs', {});
});
// 监听客户端的 登录页面请求
app.get('/login', (req, res) => {
    //  放回登录页面
    res.render('login.ejs', {});
});

app.post('/register', (req, res) => {
    res.send({ status: 200, msg: 'ok' });
});
// 创建端口号 并启动服务器
app.listen(3000, () => {
    console.log("服务器运行成功……");
});