const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const db = require('../../utils/db');
const md5 = require('md5');
const { Base64 } = require('js-base64');

// $routes /api/user/ceshi
// @desc 测试连接数据库情况Oracle
// @access public
router.get('/ceshi', async(req, res) => {
    let result;
    let obj = {
        sql: `select * from (select b_id,b_title,(select c_name from book_class where c_id = b_class) as b_class,b_img,b_author,b_detail,rownum num from book) 
        where num<=${req.query.end} and num>${req.query.start}`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    res.json(result)
})

// $routes /api/user/login
// @desc 登录
// @access public
router.post('/login', async(req, res) => {
    let result;
    let obj = {
        sql: `select count(*) as num from user_table where u_email = '${req.body.email}' and u_passw = '${req.body.passw}'`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    if (result.rows[0].NUM == 0) {
        res.json({
            msg: '用户名不存在/密码错误'
        })
    }
    // MD5 & Base64
    let tokenObj = {
        email: req.body.email,
        passw: req.body.passw
    }
    let tokenMd5 = md5(JSON.stringify(tokenObj))
    console.log(tokenMd5)
    res.json({
        token: Base64.btoa(tokenMd5 + Date.parse(new Date()))
    })
})

// $routes /api/user/register
// @desc 注册
// @access public
router.post('/register', async(req, res) => {
    let result;
    let obj = {
        sql: `insert into user_table(u_email,u_passw) values(:1, :2)`,
        binds: [
            [req.body.email, req.body.passw]
        ],
        options: {
            autoCommit: true,
            // batchErrors: true,  // continue processing even if there are data errors
            bindDefs: [
                { type: oracledb.STRING, maxSize: 50 },
                { type: oracledb.STRING, maxSize: 50 }
            ]
        }
    }
    result = await db.insert(obj);
    res.json(result)
})

// $routes /api/user/deToken
// @desc token换用户名
// @access public
router.post('/deToken', async(req, res) => {
    let result;
    let token = req.body.token
    let md5_str_temp = Base64.atob(token)
    let md5_str = ''
    for (let i = 0; i < md5_str_temp.length - 13; ++i) md5_str += md5_str_temp.charAt(i)
    let obj = {
        sql: `select * from user_table`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    let user
    result.rows.map((value, key) => {
        let tokenObj = {
            email: value.U_EMAIL,
            passw: value.U_PASSW
        }
        if (md5(JSON.stringify(tokenObj)) == md5_str) {
            user = {
                id: value.U_ID,
                email: value.U_EMAIL
            }
        }
    })
    if (user == undefined) res.json({
        msg: 0
    })
    else {
        res.json(user)
    }
})

// $routes /api/user/auth
// @desc 修改
// @access public
router.post('/auth', async(req, res) => {
    let result;
    let obj = {
        sql: `select * from user_table where u_email='${req.body.email}' and u_passw='${req.body.resourcePassw}'`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    console.log(obj.sql)
    result = await db.select(obj);
    console.log(result)
    if (result.rows.length == 0) {
        res.json({
            msg: 0
        })
    } else {
        let obj1 = {
            sql: `update user_table set u_passw=${req.body.passw} where u_id=${result.rows[0].U_ID}`,
            binds: {},
            options: {
                outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
            }
        }
        let result1 = await db.select(obj1)
        res.json(result1)
    }
})
module.exports = router;