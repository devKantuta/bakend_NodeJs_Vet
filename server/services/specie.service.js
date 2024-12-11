import conn_pgSql from "../db/conn_db.js";


class SpecieService {
  constructor() {}

  // get All Sepcies
  async getAllData() {
    try {
      const query = "SELECT * FROM especie ORDER BY id";
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
      const {
        nombre,
        descripcion,
      } = data;
      // Insertar en la tabla 
      const especieQuery = `INSERT INTO especie (nombre, descripcion) VALUES ($1, $2) RETURNING id`;
      const response = await conn_pgSql.query(especieQuery, [
        nombre,
        descripcion,
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
      const especieId = id;
      const { nombre, descripcion } = data;

      // Actualizar los datos de la persona
      const especieQuery = `UPDATE especie SET nombre = $1, descripcion = $2 WHERE id = $3`; //(SELECT id_persona FROM empleado WHERE id = $7)
      const response = await conn_pgSql.query(especieQuery, [nombre,descripcion,especieId]);

      return response.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //Delete data
  async deleteData(especieId) {
    try {
      // Eliminar el registro de la tabla PERSONA
      const personaQuery = "DELETE FROM especie WHERE id = $1";
      const response = await conn_pgSql.query(personaQuery, [especieId]);

      return response.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
};

/* const test = new SpecieService();
const res = await test.getAllSpecies();
console.log(res); */


export { SpecieService };