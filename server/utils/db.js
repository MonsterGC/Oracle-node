const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');
oracledb.autoCommit = true;

exports.select = async function(obj) {
    let connection;
    try {
        let { sql, binds, options, result } = obj;
        connection = await oracledb.getConnection(dbConfig);
        console.log('连接成功...')
        result = await connection.execute(sql, binds, options);
        return result;
    } catch (err) {
        console.error(err)
    } finally {
        if (connection) {
            try {
                console.log('查询完毕，关闭连接...')
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

exports.insert = async function(obj) {
    let connection;
    try {
        let { sql, binds, options, result } = obj;
        connection = await oracledb.getConnection(dbConfig);
        console.log('连接成功...')
        result = await connection.executeMany(sql, binds, options);
        return result;
    } catch (err) {
        console.error(err)
    } finally {
        if (connection) {
            try {
                console.log('插入完毕，关闭连接...')
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}