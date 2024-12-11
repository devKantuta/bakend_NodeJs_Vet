import { Router } from "express";

import { empleadoController } from "../controllers/empleadoController.js"; 

const routerEmpleado = Router();

routerEmpleado.get("/empleados", empleadoController.getAllData);
routerEmpleado.post("/empleados", empleadoController.createData);
routerEmpleado.put("/empleados/:id", empleadoController.updateData);
routerEmpleado.delete("/empleados/:id", empleadoController.deleteData);

export default routerEmpleado;
