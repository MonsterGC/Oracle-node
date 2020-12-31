const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const db = require('../../utils/db');

// $routes /api/send/msg
// @desc 点评
// @access public
router.post('/msg', async(req, res) => {
    let result1, result2;
    let obj1 = {
        sql: 'select max(m_id) as num from book_msg',
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result1 = await db.select(obj1);
    let obj2 = {
        sql: `insert into book_msg(m_content) values(:1)`,
        binds: [
            [req.body.msg]
        ],
        options: {
            autoCommit: true,
            // batchErrors: true,  // continue processing even if there are data errors
            bindDefs: [
                { type: oracledb.STRING, maxSize: 250 }
            ]
        }
    }
    result2 = await db.insert(obj2);
    let obj3 = {
        sql: `insert into book_msg_relate(r_bookid,r_msgid,r_userid) values(:1,:2,:3)`,
        binds: [
            [parseInt(req.body.bookid), result1.rows[0].NUM + 1, parseInt(req.body.userid)]
        ],
        options: {
            autoCommit: true,
            // batchErrors: true,  // continue processing even if there are data errors
            bindDefs: [
                { type: oracledb.NUMBER },
                { type: oracledb.NUMBER },
                { type: oracledb.NUMBER }
            ]
        }
    }
    let result3 = await db.insert(obj3);
    res.json(result1)
})

module.exports = router