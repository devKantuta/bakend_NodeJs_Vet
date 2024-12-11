import conn_pgSql from "../db/conn_db.js";

class BreedService{
  constructor() { };

  // get all breeds
  async getAllBreeds() {
    try {
      const query = "SELECT * FROM breed ORDER by id ASC";
      const {rows} = await conn_pgSql.query(query);
      return rows;
      
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  //get by Id 
  async getIdBreed(id) {
    try {
      const query = `SELECT * FROM breed where id =${id}`;
      const { rows } = await conn_pgSql.query(query);
      //console.log(rows);
      return rows;
      
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  //create breed
  async createBreed(data) {
    try {
      const query = "INSERT INTO breed(name,description) VALUES ($1,$2) RETURNING id";
      const response = await conn_pgSql.query(query, [data.name, data.description]);
      //console.log('breed: ',response)
      //console.log('breed: ', response.rows[0].id);
      return response.rowCount > 0;// Devuelve true si inserto al menos una fila
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //update
  async  updateBreedById(id, breedData) {
  try {
    const query = "UPDATE breed SET name = $1, description = $2 WHERE id = $3";
    const values = [breedData.name, breedData.description, id];

    const res = await conn_pgSql.query(query, values);
    return res.rowCount > 0; // Devuelve true si se actualizó al menos una fila
  } catch (error) {
    console.error(error);
    return false; // Devuelve false en caso de error
  }
}

  //delete
  async deleteBreedById(id) {
  try {
    const query = "DELETE FROM breed WHERE id = $1";
    const values = [id];
    const res = await conn_pgSql.query(query, values);
    return res.rowCount > 0; // Devuelve true si se eliminó al menos una fila
  } catch (error) {
    console.error(error); 
    return false; // Devuelve false en caso de error
  }
}

}

const breed = {
  name: "rey leon",
  description:"raza arrugada"
}

const test = new BreedService();
//const res = await test.getIdBreed(6);
const res = await test.createBreed(breed);
//const res = await test.updateBreedById(3,breed);
//const res = await test.deleteBreedById(4);
//const res = await test.getAllBreeds();
console.log("service:",res);

export {
  BreedService
}