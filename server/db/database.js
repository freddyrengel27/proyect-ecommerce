'use strict'
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = async () =>{
    return await mysql.createConnection({
        host: process.env.DATA_BASE_HOST,
        user: process.env.DATA_BASE_USER,
        database: process.env.DATA_BASE_DATABASE
    });
}


   


export default conn;