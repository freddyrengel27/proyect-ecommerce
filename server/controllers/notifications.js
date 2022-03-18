'use strict'
import moment from "moment";
import conn from "../db/database.js";

const con = await conn();

const controllerNotification = async (emite, recibe, evento) =>{

    const noty = {
        emite,
        recibe,
        evento,
        fecha: moment().format("YYYY- MM-DD HH:mm:ss")
    };

    let sql = "INSERT INTO notifications(emitido, receptor, evento, fecha_evento, notificado) VALUES(?, ?, ?, ?, ?) ";
    await con.execute(sql, [noty.emite, noty.recibe, noty.evento, noty.fecha, 0]);


};

export default controllerNotification;
