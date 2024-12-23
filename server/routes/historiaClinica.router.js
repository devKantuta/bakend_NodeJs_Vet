import { Router } from "express";
import { historiaClinicaController } from "../controllers/historiaClinica.Controller.js";
const routerHistoriClinica = Router();

routerHistoriClinica.get("/historias", historiaClinicaController.getAllData);
routerHistoriClinica.get("/historias/num_hc", historiaClinicaController.getHcMaxValue);
routerHistoriClinica.post("/historias", historiaClinicaController.createData);
routerHistoriClinica.put("/historias/:id", historiaClinicaController.updateData);
routerHistoriClinica.delete("/historias/:id", historiaClinicaController.deleteData);

export default routerHistoriClinica;