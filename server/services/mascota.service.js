import conn_pgSql from "../db/conn_db.js";

class MascotaService {
  constructor() {}

  // metodo get all clientes
  async getAllData() {
    try {
      const query = `SELECT ma.* , pe.nombre as cliente ,  ra.nombre as raza , es.nombre as especie
      FROM persona pe , cliente cl , raza ra , especie es, mascota ma
      WHERE pe.rol= 'cliente' and cl.id_persona = pe.id and ra.id_especie = es.id and ma.id_cliente =cl.id and ma.id_raza =ra.id
      ORDER BY ma.id ASC`;

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
        id_cliente,//en realidad es id_persona
        id_raza ,
        nombre ,
        edad,
        fecha_reg ,
        sexo,
        color
      } = data;
      const clienteQuery = `SELECT id	FROM cliente cl WHERE id_persona = $1`;
      const clienteResult = await conn_pgSql.query(clienteQuery, [id_cliente]);
      const clienteId = clienteResult.rows[0].id
    

      // Insertar en la tabla PERSONA
      const mascotaQuery = `INSERT INTO mascota(id_cliente,id_raza,nombre,edad,fecha_reg,sexo,color) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      
      const response = await conn_pgSql.query(mascotaQuery, [
        clienteId,
        id_raza,
        nombre,
        edad,
        fecha_reg,
        sexo,
        color,
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
      const mascotaId = id;
      const { id_cliente, id_raza, nombre, edad, fecha_reg, sexo, color, id_especie } = data;

      // OBTENEMOS LA EL ID DE CLIENTE YA Q NOS DA id_persona
      const clienteQuery = `SELECT id	FROM cliente WHERE id_persona = $1`;
      const clienteResult = await conn_pgSql.query(clienteQuery, [id_cliente]);
      const clienteId = clienteResult.rows[0].id;

      //actulizamos la tabla raza su especie
      const razaQuery = `UPDATE raza SET id_especie = $1 WHERE id = $2`;
      await conn_pgSql.query(razaQuery, [id_especie, id_raza]);

      // Actualizar los datos de la persona
      const mascotaQuery = `UPDATE mascota SET id_cliente = $1, id_raza = $2, nombre = $3, edad = $4, fecha_reg = $5, sexo = $6, color=$7 
      WHERE id = $8`;
      //(SELECT id_persona FROM empleado WHERE id = $7)
      const response = await conn_pgSql.query(mascotaQuery, [
        clienteId,
        id_raza,
        nombre,
        edad,
        fecha_reg,
        sexo,
        color,
        mascotaId,
      ]);

      return response.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //Delete data
  async deleteData(mascotaId) {
    try {
      // Eliminar el registro de la tabla PERSONA
      const mascotaQuery = "DELETE FROM mascota WHERE id = $1";
      const response = await conn_pgSql.query(mascotaQuery, [mascotaId]);
      return response.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
}

export default MascotaService;
