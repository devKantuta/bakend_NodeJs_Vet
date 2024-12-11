import { Router } from "express";

import { clientController } from "../controllers/clienteController.js";

const routerClient = Router();

routerClient.get('/clientes', clientController.getAllData);
routerClient.post('/clientes', clientController.createData);
routerClient.put('/clientes/:id', clientController.updateData);
routerClient.delete('/clientes/:id', clientController.deleteData);


export default routerClient;