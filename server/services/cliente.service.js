import conn_pgSql from "../db/conn_db.js";


class ClienteService {
  constructor() {}

  // metodo get all clientes
  async getAllData() {
    try {
      const query = `SELECT p.* , c.nit , c.fecha_reg from persona p , cliente c
      WHERE c.id_persona = p.id and p.rol='cliente'
      ORDER BY p.id ASC`;

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
      const { nombre, direccion, celular, correo, sexo, rol, nit } = data;
      // Insertar en la tabla PERSONA
      const personaQuery = `INSERT INTO persona (nombre, direccion, celular, correo, sexo, rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
      const personaResult = await conn_pgSql.query(personaQuery, [
        nombre,
        direccion,
        celular,
        correo,
        sexo,
        rol,
      ]);
      //saco de aqui porq retorna un array dentro esta objeto 'rows'
      const personaId = personaResult.rows[0].id;

      // Insertar en la tabla CLIENTE
      const clienteQuery =
        "INSERT INTO cliente (id_persona, fecha_reg, nit) VALUES ($1,CURRENT_DATE,$2)";
      const response = await conn_pgSql.query(clienteQuery, [personaId, nit]);
      return response.rowCount > 0; // devuelve true si inserto
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //update DAta
  async updateData(id, data) {
    try {
      const clienteId = id;
      const { nombre, direccion, celular, correo, sexo, rol, nit,fecha_reg } = data;

      // Actualizar los datos de la persona
      const personaQuery = `UPDATE persona 
      SET nombre = $1, direccion = $2, celular = $3, correo = $4, sexo = $5, rol = $6
      WHERE id = $7`;
      await conn_pgSql.query(personaQuery, [
        nombre,
        direccion,
        celular,
        correo,
        sexo,
        rol,
        clienteId,
      ]);
      const clienteQuery = `UPDATE cliente SET fecha_reg=$1, nit=$2
        WHERE id=(SELECT id FROM cliente WHERE id_persona = $3)
      `;
      const response = await conn_pgSql.query(clienteQuery,[fecha_reg,nit,clienteId])
      return response.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //Delete data
  async deleteData(clienteId) {
    try {
      
      // Eliminar el registro de la tabla PERSONA
      const personaQuery =
        "DELETE FROM persona WHERE id = $1";
      const response = await conn_pgSql.query(personaQuery, [clienteId]);
      
      //ahora eliminamos al cliente en la tabla
      const clienteQuery = "DELETE FROM cliente WHERE id_persona = $1";
      await conn_pgSql.query(clienteQuery, [clienteId]);

      return response.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
}// end class


export default ClienteService;






