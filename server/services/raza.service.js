import conn_pgSql from "../db/conn_db.js";

class RazaService {
  constructor() {}

  // get all Datas
  async getAllData() {
    try {
      const query = `SELECT r.*,e.nombre as especie FROM raza r ,especie e 
      WHERE r.id_especie = e.id ORDER BY r.id;`;
      const { rows } = await conn_pgSql.query(query);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  // metodo para agregar datos a la tabla 

  async createData(data) {
    try {
      const { id_especie, nombre, descripcion } = data;
      // Insertar en la tabla PERSONA
      const razaQuery = `INSERT INTO raza (id_especie,nombre,descripcion) VALUES ($1, $2, $3) RETURNING id`;
      const response = await conn_pgSql.query(razaQuery, [
        id_especie,nombre,descripcion
      ]);
      return response.rowCount > 0; // devuelve true si inserto
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //update DAta
  async updateData(id, data) {
    try {
      
      const {nombre,descripcion,id_especie} = data;

      // Actualizar los datos de la persona
      const razaQuery = `UPDATE raza SET nombre = $1, descripcion = $2, id_especie = $3 WHERE id = $4`; //(SELECT id_persona FROM empleado WHERE id = $7)
      const response = await conn_pgSql.query(razaQuery, [
        nombre,descripcion,id_especie,id
      ]);
      return response.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //Delete data
  async deleteData(id) {
    try {
      console.log("id: ", id);
      // Eliminar el registro de la tabla PERSONA
      const razaQuery = "DELETE FROM raza WHERE id = $1";
      const response = await conn_pgSql.query(razaQuery, [id]);
      return response.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
}

/* const breed = {
  name: "rey leon",
  description: "raza arrugada",
}; */

//const test = new BreedService();
//const res = await test.getIdBreed(6);
//const res = await test.createBreed(breed);
//const res = await test.updateBreedById(3,breed);
//const res = await test.deleteBreedById(4);
//const res = await test.getAllBreeds();
//console.log("service:", res);

export { RazaService };
