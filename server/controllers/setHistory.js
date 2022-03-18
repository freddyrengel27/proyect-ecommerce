'use strict'
import conn from "../db/database.js";
import moment from "moment";

const con = await conn();

const history = (user, accion) =>{

    const historia = {
        idUser: user,
        accion,
        fecha: moment().format("YYYY-MM-DD"),
        hora: moment().format("HH:mm:ss")
    };

    console.log(historia)

    let sql = "INSERT INTO history(id_user, evento, fecha_historia, hora_historia) VALUE(?, ?, ?, ?)";

    con.execute(sql, [historia.idUser, historia.accion, historia.fecha, historia.hora]);

};

export default history;
