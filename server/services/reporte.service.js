import conn_pgSql from "../db/conn_db.js";

class ReporteService {
  constructor() {}

  // reporte
  async getDia(data) {
    try {
      const { id, fecha } = data;
      const query = `select pe.nombre as "veterinario", ma.nombre as "mascota", hc.num_hc, ma.sexo as "sexo", co.fecha_reg as "fecha", co.precio as "precio"
      from consulta co,persona pe, empleado em, historia_clinica hc, mascota ma
      where co.id_empleado = $1 and
      co.fecha_reg =$2 and (
      co.id_empleado = em.id and 
      em.id_persona = pe.id) and
      co.id_hc = hc.id and
      hc.id_mascota = ma.id `;
      const { rows } = await conn_pgSql.query(query, [id, fecha]);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getSemanal(data) {
    try {
      const { id, fecha_ini, fecha_fin } = data;
      const query = `select pe.nombre as "veterinario", ma.nombre as "mascota", hc.num_hc, ma.sexo as "sexo", co.fecha_reg as "fecha", co.precio as "precio"
      from consulta co,persona pe, empleado em, historia_clinica hc, mascota ma
      where co.id_empleado = $1 and
      co.fecha_reg >= $2 and
      co.fecha_reg <= $3 and (
      co.id_empleado = em.id and 
      em.id_persona = pe.id) and
      co.id_hc = hc.id and
      hc.id_mascota = ma.id `;
      const { rows } = await conn_pgSql.query(query, [
        id,
        fecha_ini,
        fecha_fin,
      ]);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getCobro(data) {
    try {
      const { id, fecha_ini, fecha_fin } = data;
      const query = `select pe.nombre as "veterinario", ma.nombre as "mascota", hc.num_hc, ma.sexo as "sexo", co.fecha_reg as "fecha", co.precio as "precio", SUM(co.precio) OVER () AS "precio_total"
      from consulta co,persona pe, empleado em, historia_clinica hc, mascota ma
      where co.id_empleado = $1 and
      co.fecha_reg >= $2 and
      co.fecha_reg <= $3 and (
      co.id_empleado = em.id and 
      em.id_persona = pe.id) and
      co.id_hc = hc.id and
      hc.id_mascota = ma.id `;
      const { rows } = await conn_pgSql.query(query, [
        id,
        fecha_ini,
        fecha_fin,
      ]);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getCobroGeneral(data) {
    try {
      const {fecha_ini, fecha_fin } = data;
      const query = `SELECT co.* ,pe.nombre as "veterinario", 
        ma.nombre as "mascota", 
        hc.num_hc,
        ma.sexo as "sexo",  
        SUM(co.precio) OVER () AS "precio_total"
      FROM consulta co,persona pe, empleado em, historia_clinica hc, mascota ma
      WHERE co.fecha_reg >= $1 and
            co.fecha_reg <= $2  and (
            co.id_empleado = em.id and 
            em.id_persona = pe.id) and
            co.id_hc = hc.id and
            hc.id_mascota = ma.id;
      ;`;
      const { rows } = await conn_pgSql.query(query, [
        fecha_ini,
        fecha_fin,
      ]);
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export { ReporteService };
