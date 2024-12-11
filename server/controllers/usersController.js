import { Router } from "express";
import bcrypt from "bcryptjs";
//import { BDD } from "../database/bdd.js";
import { getAllUsersWithPosgre } from "../services/users.service.js";

const loginRouter = Router();

loginRouter.post("/users", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  // validando q llene todos los campos
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Rellene todos los cambos",
    });
  }
  //Buscamos si existe ya este usuarioi en DB
  //const usuario = BDD.find((user) => user.email === email);
  const users_db = await getAllUsersWithPosgre();
  console.log(users_db);
  const usuario = users_db.find((user) => user.email === email);

  // Valida si el usuario no existe en la DB entra
  if (Object.keys(usuario || {}).length === 0) {
    return res.json({
      status: false,
      message: "Este usuario No existe",
    });
  }
  //VALIDANDO PASSWORD SIN TOKEN
  if (usuario.password !== password) {
    return res.json({
      status: false,
      message:"Contraseña Invalida..😢"
    })
  }
/*   let hash = usuario.password;
  let equalPasword = bcrypt.compareSync(passwordLogin, hash);
  if (!equalPasword)
    return res.status(401).json({
      status: "Error",
      message: "contraseña invalida",
    }); */

  // si esto bien le mandamos un status 200
  res.status(200).json({
    status: true,
    message: `Bienvenido ${usuario.nameuser}..!`,
  });
});

export default loginRouter;
