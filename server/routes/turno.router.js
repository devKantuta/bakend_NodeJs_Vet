import { Router } from "express";
import { turnoController } from "../controllers/turnoController.js"; 

const routerTurno = Router();

routerTurno.get("/turnos", turnoController.getAllData);
routerTurno.post("/turnos", turnoController.createData);
routerTurno.put('/turnos/:id', turnoController.updateData);

//routerBreed.put("/turnos/", turnoController.updateIdBreed);

routerTurno.delete("/turnos/:id", turnoController.deleteData);

export default routerTurno;
