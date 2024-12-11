import conn_pgSql from "../db/conn_db.js";

class HistoriaClinicaService {
  constructor() {}

  // metodo get all clientes
  async getAllData() {
    try {
      const query = `SELECT hc.*,ma.nombre as mascota FROM historia_clinica hc ,mascota ma 
      WHERE ma.id = hc.id_mascota ORDER BY hc.id ASC`;

      const { rows } = await conn_pgSql.query(query);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // metodo para agregar datos a la tabla cliente

  async createData(data) {
    try {
      const {id_mascota,fecha_reg,num_hc} = data;
      

      // Insertar en la tabla PERSONA
      const historiaQuery = `INSERT INTO historia_clinica(id_mascota,fecha_reg,num_hc) VALUES($1,$2,$3)`;

      const response = await conn_pgSql.query(historiaQuery, [
       id_mascota,fecha_reg,num_hc
      ]);
      //saco de aqui porq retorna un array dentro esta objeto 'rows'
      //const personaId = personaResult.rows[0].id;
      return response.rowCount > 0; // devuelve true si inserto
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //update DAta
  async updateData(id, data) {
    try {
      const historiaId = id;
      const { id_mascota, fecha_reg, num_hc } = data;
      //(SELECT id_persona FROM empleado WHERE id = $7)
      const historiaQuery = `UPDATE historia_clinica SET id_mascota = $1, fecha_reg = $2, num_hc= $3 WHERE id = $4`;
      const response = await conn_pgSql.query(historiaQuery, [
        id_mascota, fecha_reg, num_hc,historiaId,
      ]);

      return response.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //Delete data
  async deleteData(hisoriaId) {
    try {
      // Eliminar el registro de la tabla PERSONA
      const historiaQuery = "DELETE FROM historia_clinica WHERE id = $1";
      const response = await conn_pgSql.query(historiaQuery, [hisoriaId]);
      return response.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
}

export default HistoriaClinicaService;
