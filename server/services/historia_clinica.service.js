import conn_pgSql from "../db/conn_db.js";

class HistoriaClinicaService {
  constructor() {}

  // metodo get all clientes
  async getAllData() {
    try {
      /* const query = `SELECT hc.*,ma.nombre as mascota FROM historia_clinica hc ,mascota ma 
      WHERE ma.id = hc.id_mascota ORDER BY hc.id ASC`; */

      const query = `SELECT hc.*,ma.nombre as mascota,pe.nombre as cliente, cl.id as id_cliente , ra.nombre as raza, ma.edad
        FROM historia_clinica hc ,mascota ma,cliente cl,persona pe ,raza ra
        WHERE ma.id = hc.id_mascota AND ma.id_cliente=cl.id AND cl.id_persona=pe.id AND ma.id_raza = ra.id
        ORDER BY hc.num_hc ASC;`;

      const { rows } = await conn_pgSql.query(query);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  // metodo para obtener el ultima ficha clinica 
  async getHcMaxValue() {
    const query = `SELECT MAX(num_hc) FROM historia_clinica`;
    const {rows} = await conn_pgSql.query(query);
    
    return rows;
  }

  

  // metodo para agregar datos a la tabla cliente

  async createData(data) {
    try {
      const {id_mascota,fecha_reg,num_hc,t_sangre,alergia} = data;
      console.log(data)

      // Insertar en la tabla PERSONA
      const historiaQuery = `INSERT INTO historia_clinica(id_mascota,fecha_reg,num_hc,t_sangre,alergia) VALUES($1,$2,$3,$4,$5)`;

      const response = await conn_pgSql.query(historiaQuery, [
       id_mascota,fecha_reg,num_hc,t_sangre,alergia
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
      const { id_mascota, fecha_reg, num_hc ,t_sangre ,alergia } = data;
      //(SELECT id_persona FROM empleado WHERE id = $7)
      const historiaQuery = `UPDATE historia_clinica SET id_mascota = $1, fecha_reg = $2, num_hc= $3,t_sangre=$4,alergia=$5
       WHERE id = $6`;
      const response = await conn_pgSql.query(historiaQuery, [
        id_mascota, fecha_reg, num_hc, t_sangre,alergia, historiaId,
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
const prueba = new HistoriaClinicaService()
const rs = await prueba.getHcMaxValue();
 console.log(rs);
export default HistoriaClinicaService;
