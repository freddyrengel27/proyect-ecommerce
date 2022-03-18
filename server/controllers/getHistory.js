import conn from "../db/database.js";

const con = await conn();

const getHistory = async (req, res) =>{

    const {id} = req.user;

    let sql = "SELECT * FROM history WHERE id_user = ?";
    const [rows] = await con.execute(sql, [id]);

    return res.status(200).send({
        type: "nice",
        historial: rows
    });
};

export default getHistory;