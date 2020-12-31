const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const db = require('../../utils/db');

// $routes /api/getmsg/msg
// @desc 获取评论
// @access public
router.get('/msg', async(req, res) => {
    let result;
    let obj = {
        sql: `select (select m_time from book_msg where m_id = r_msgid) as m_time,(select m_content from book_msg where m_id = r_msgid) as m_content,(select u_email from user_table where u_id = r_userid) as u_email from book_msg_relate where r_bookid =${req.query.bookid}`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    res.json(result)
})


// $routes /api/getmsg/mineMsg
// @desc 获取我的评论
// @access public
router.get('/mineMsg', async(req, res) => {
    let result;
    let obj = {
        sql: `select (select b_title from book where b_id = r_bookid) as b_title,(select b_img from book where b_id = r_bookid) as b_img,(select m_content from book_msg where m_id = r_msgid) as m_content,r_userid,r_msgid,r_bookid from book_msg_relate where r_userid = ${req.query.userid}`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }

    result = await db.select(obj);
    res.json(result)
})

// $routes /api/getmsg/delMsg
// @desc 删除我的评论
// @access public
router.post('/delMsg', async(req, res) => {
    let result, result1;
    let obj = {
        sql: `delete from book_msg where m_id = ${req.body.msgid}`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    let obj1 = {
        sql: `delete from book_msg_relate where r_msgid = ${req.body.msgid} and r_bookid = ${req.body.bookid} and r_userid = ${req.body.userid}`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    result1 = await db.select(obj1);
    res.json({
        msg: 1
    })
})
module.exports = router;