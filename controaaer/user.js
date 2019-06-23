const moment = require('moment');

const conn = require('../dd/mysql.js');

const getRegister = (req, res) => {
    // 返回注册页面 
    res.render('register', {});
}

const getLogin = (req, res) => {
    //  放回登录页面
    res.render('login', {});
}

const postRegister = (req, res) => {
    // console.log(req.body);
    let body = req.body;
    // res.send({ status: 200, msg: 'ok' });
    // 判断客户端穿过来的数据 是否完整
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        console.log(1);
        return res.send({ msg: '请您填写完整的信息', status: 501 });
    }
    // 判断用户名是否重复
    const sql1 = 'select count(*) as count from user where username=?';

    conn.query(sql1, body.username, (err, result) => {
        // 如果查询失败就告诉用户
        if (err) return res.send({ msg: '用户名查询失败', status: 502 });

        if (result[0].count !== 0) return res.send({ msg: '用户名已存在请重新输入', status: 503 });
        // 注册业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
        const sql2 = 'insert into user set?';
        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册失败', status: 504 });
            if (result.affectedRows !== 1) return res.send({ msg: '注册用户失败', status: 505 });
            res.send({ msg: '注册成功', status: 200 });
        });
    });
}

const postLogin = (req, res) => {
    // 获取客户端登录的信息
    let body = req.body;
    // 执行SQL语句查询，用户是否存在
    console.log(body);
    const sql1 = 'select * from user where username=? and password=?';

    conn.query(sql1, [body.username, body.password], (err, result) => {
        // 如果查询期间，执行 SQL 语句失败， 则认为登录失败
        if (err) return res.send({ msg: '登录失败', status: 501 });
        // 如果查询的结果。的条数不为1 就表示查询失败
        if (result.length !== 1) return res.send({ msg: '登录失败', status: 502 });
        // 登录成功
        res.send({ msg: '登录成功', status: 200 });
    });

}

module.exports = {
    getRegister,
    getLogin,
    postRegister,
    postLogin
}