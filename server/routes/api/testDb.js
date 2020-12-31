const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const db = require('../../utils/db');

// $routes /api/testDb/ceshi
// @desc 测试连接数据库情况Oracle
// @access public
router.get('/ceshi', async(req, res) => {
    let result;
    let obj = {
        sql: 'select * from book_class',
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    res.json(result)
})

module.exports = router;