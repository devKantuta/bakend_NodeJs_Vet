import { Router } from "express";
import { mascotaController } from "../controllers/mascota.Controller.js";

const routerMascota = Router();

routerMascota.get('/mascotas', mascotaController.getAllData);
routerMascota.post('/mascotas', mascotaController.createData);
routerMascota.put('/mascotas/:id', mascotaController.updateData);
routerMascota.delete('/mascotas/:id', mascotaController.deleteData);


export default routerMascota;