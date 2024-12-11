import { Router } from "express";
import { razaController } from "../controllers/razaController.js";

const routerRaza = Router();

routerRaza.get("/razas", razaController.getAllData);
//routerRaza.get("/empleados", empleadoController.getAllData);
routerRaza.post("/razas", razaController.createData);
routerRaza.put("/razas/:id", razaController.updateData);
routerRaza.delete("/razas/:id", razaController.deleteData);

export default routerRaza;
