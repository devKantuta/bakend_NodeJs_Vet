import conn_pgSql from "../db/conn_db.js";

class ConsultaService {
  constructor() {}

  // metodo get all clientes
  async getAllData() {
    try {
      const query = `SELECT co.*,hc.num_hc ,pe.nombre AS veterinario
	      FROM persona pe,empleado em, historia_clinica hc, consulta co
	      WHERE co.id_hc =hc.id and em.id=co.id_empleado and pe.id = (select id_persona from empleado where  co.id_empleado =id)
	      ORDER BY co.id ;`;

      const response = await conn_pgSql.query(query);
      const {rows} = response
     
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
        id_hc, 
        id_empleado,
        fecha_reg,
        peso,
        temperatura,
        motivo,
        diagnostico,
        tratamiento,
      } = data;
      const empleadoQuery = `SELECT id	FROM empleado  WHERE id_persona = $1`;
      const clienteResult = await conn_pgSql.query(empleadoQuery, [id_empleado]);
      const empleadoId = clienteResult.rows[0].id;

      // Insertar en la tabla PERSONA
      const consultaQuery = `INSERT INTO consulta(id_hc,id_empleado,fecha_reg,peso,temperatura,motivo,diagnostico,tratamiento) 
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8)`;

      const response = await conn_pgSql.query(consultaQuery, [
        id_hc,
        empleadoId,
        fecha_reg,
        peso,
        temperatura,
        motivo,
        diagnostico,
        tratamiento,
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
      const consultaId = id;
      const {
        id_hc,
        id_empleado,
        fecha_reg,
        peso,
        temperatura,
        motivo,
        diagnostico,
        tratamiento,
      } = data;

      // OBTENEMOS LA EL ID DE CLIENTE YA Q NOS DA id_persona
      const empleadoQuery = `SELECT id	FROM empleado WHERE id_persona = $1`;
      const clienteResult = await conn_pgSql.query(empleadoQuery, [id_empleado]);
      const empleadoId = clienteResult.rows[0].id;

      
      
      // Actualizar los datos de la persona
      const consultaQuery = `UPDATE consulta SET id_hc = $1, id_empleado = $2,fecha_reg = $3, peso = $4, temperatura = $5, motivo = $6, diagnostico=$7,tratamiento=$8 
      WHERE id = $9`;
      //(SELECT id_persona FROM empleado WHERE id = $7)
      const response = await conn_pgSql.query(consultaQuery, [
        id_hc,
        empleadoId,
        fecha_reg,
        peso,
        temperatura,
        motivo,
        diagnostico,
        tratamiento,
        consultaId,
      ]);

      return response.rowCount > 0; // Devuelve true si se actualizó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }

  //Delete data
  async deleteData(consultaId) {
    try {
      
      // Eliminar el registro de la tabla PERSONA
      const mascotaQuery = "DELETE FROM consulta WHERE id = $1";
      const response = await conn_pgSql.query(mascotaQuery, [consultaId]);
      return response.rowCount > 0; // Devuelve true si se eliminó al menos una fila
    } catch (error) {
      console.error(error);
      return false; // Devuelve false en caso de error
    }
  }
}

export default ConsultaService;
