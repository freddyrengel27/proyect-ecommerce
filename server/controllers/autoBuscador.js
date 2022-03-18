'use strict'
import conn from "../db/database.js";

const con = await conn();

const autoComplete = async (palabra) =>{

    let sql = "SELECT DISTINCT nombre FROM products WHERE nombre LIKE ?"  ;

    const [rows] = await con.execute(sql, ["%"+palabra+"%"]);
    return rows;
};

export default autoComplete;