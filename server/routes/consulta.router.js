import { Router } from "express";
import { consultaController } from "../controllers/consulta.Controller.js"; 

const routerConsulta = Router();

routerConsulta.get("/consultas", consultaController.getAllData);
routerConsulta.post("/consultas", consultaController.createData);
routerConsulta.put("/consultas/:id", consultaController.updateData);
routerConsulta.delete("/consultas/:id", consultaController.deleteData);

export default routerConsulta;
