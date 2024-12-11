import { Router } from "express";
import { specieController } from "../controllers/specieController.js";


const routerSpecie = Router();

routerSpecie.get('/especies', specieController.getAllDataSpecies);
//routerSpecie.get("/empleados", empleadoController.getAllData);
routerSpecie.post("/especies", specieController.createData);
routerSpecie.put("/especies/:id", specieController.updateData);
routerSpecie.delete("/especies/:id", specieController.deleteData);


export default routerSpecie;