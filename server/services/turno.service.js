import conn_pgSql from "../db/conn_db.js";

class TurnoService {
  constructor() {}

  // get all breeds
  async getAllData() {
    try {
      const query = "SELECT * FROM turno ORDER by id ASC";
      const { rows } = await conn_pgSql.query(query);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  
  //create breed
  async createData(data) {
    try {
      const { nombre,hora_ini,hora_fin } = data;
      const query =
        "INSERT INTO turno(nombre,hora_ini,hora_fin) VALUES($1,$2,$3) ";
      const response = await conn_pgSql.query(query, [
        nombre,hora_ini,hora_fin
      ]);
      return response.rowCount > 0; // Devuelve true si inserto al menos una fila
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //update
  async updateData(id, data) {
    try {
      const { nombre, hora_ini, hora_fin } = data;
      const query =
        "UPDATE turno SET nombre = $1, hora_ini = $2 ,hora_fin = $3  WHERE id = $4";
      const values = [nombre,hora_ini,hora_fin,id];

      const res = await conn_pgSql.query(query, values);
      return res.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //delete
  async deleteData(id) {
    try {
      const query = "DELETE FROM turno WHERE id = $1";
      const values = [id];
      const res = await conn_pgSql.query(query, values);
      return res.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
}


export { TurnoService };
