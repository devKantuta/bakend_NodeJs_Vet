import conn_pgSql from "../db/conn_db.js";

// FUNCION QUE OBTIENE LA TABLA DE USUARIOS
async function getAllUsersWithPosgre() {
  try {
    const query = "SELECT * FROM users";
    const { rows, rowCount } = await conn_pgSql.query(query);

    console.log(" database users :", rows);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

//getAllUsersWithPosgre();
export { getAllUsersWithPosgre };


