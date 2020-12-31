const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const db = require('../../utils/db');


// $routes /api/getbook/num
// @desc 获取书本总数
// @access public
router.get('/num', async(req, res) => {
    let result;
    let obj = {
        sql: `select count(*) as num from book`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    res.json(result)
})

// $routes /api/getbook/class
// @desc 获取书本类型(全部类型)
// @access public
router.get('/class', async(req, res) => {
    let result;
    let obj = {
        sql: `select * from book_class`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    res.json(result)
})

// $routes /api/getbook/classNum
// @desc 获取某个分类的总数
// @access public
router.get('/classNum', async(req, res) => {
    let result;
    let obj = {
        sql: `select count(*) as num from (select b.*,c.c_name as c_name from book b,book_class c where b.b_class = c.c_id) where c_name = '${req.query.type}'`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    res.json(result)
})

// $routes /api/getbook/pageDetail
// @desc 分页获取书本信息
// @access public
router.get('/pageDetail', async(req, res) => {
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

// $routes /api/getbook/pageTypeDetail
// @desc 分页获取书本信息(类别)
// @access public
router.get('/pageTypeDetail', async(req, res) => {
    let result;
    let obj = {
        sql: `select * from (select b_id,b_title,b_class,b_img,b_author,b_detail,rownum num from (select b_id,b_title,(select c_name from book_class where c_id = b_class) as b_class,b_img,b_author,b_detail from book) where b_class = '${req.query.type}') 
        where num<=${req.query.end} and num>${req.query.start}`,
        binds: {},
        options: {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
        }
    }
    result = await db.select(obj);
    res.json(result)
})
module.exports = router;