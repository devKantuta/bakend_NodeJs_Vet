import conn_pgSql from "../db/conn_db.js";

class EmpleadoService {
  constructor() {}

  // metodo get all clientes
  async getAllData() {
    try {
      const query = `SELECT p.* ,e.id as id_empleado, e.fecha_reg, t.nombre as turno 
      FROM persona p , empleado e , turno t
      WHERE e.id_persona = p.id and p.rol='empleado' and e.id_turno = t.id
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
      const { nombre, direccion, celular, correo,sexo, rol, id_turno,fecha_reg } = data;
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

      // Insertar en la tabla EMPLEADO
      const empleadoQuery =
        "INSERT INTO empleado (id_persona, fecha_reg, id_turno) VALUES ($1,$2,$3)";
      const response = await conn_pgSql.query(empleadoQuery, [personaId, fecha_reg,id_turno]);
      return response.rowCount > 0; // devuelve true si inserto
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //update DAta
  async updateData(id, data) {
    try {
      
      const empleadoId = id;
      const {
        nombre,
        direccion,
        celular,
        correo,
        sexo,
        rol,
        id_turno,
        fecha_reg,
      } = data;

      // Actualizar los datos de la persona
      const personaQuery = `UPDATE persona SET nombre = $1, direccion = $2, celular = $3, correo = $4, sexo = $5, rol = $6  WHERE id = $7`; //(SELECT id_persona FROM empleado WHERE id = $7)
      await conn_pgSql.query(personaQuery, [
        nombre,
        direccion,
        celular,
        correo,
        sexo,
        rol,
        empleadoId,
      ]);
    
      const empleadoQuery = `UPDATE empleado SET fecha_reg=$1, id_turno=$2 WHERE id=(SELECT id FROM empleado WHERE id_persona = $3)`;
      const response = await conn_pgSql.query(empleadoQuery, [
        fecha_reg,
        id_turno,
        empleadoId,
      ]);
      
      return response.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //Delete data
  async deleteData(clienteId) {
    try {
      console.log('id: ',clienteId)
      // Eliminar el registro de la tabla PERSONA
      const personaQuery = "DELETE FROM persona WHERE id = $1";
      const response = await conn_pgSql.query(personaQuery, [clienteId]);
      
      //ahora eliminamos al cliente en la tabla
      const empleadoQuery =
        "DELETE FROM empleado WHERE id = (SELECT id FROM empleado WHERE id_persona = $1)";
      await conn_pgSql.query(empleadoQuery, [clienteId]);
      
      return response.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
}

export default EmpleadoService;