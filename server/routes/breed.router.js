import { Router } from "express";
import { breedController } from "../controllers/breedController.js";

const routerBreed = Router();

routerBreed.get('/breed', breedController.getAllBreeds);
routerBreed.post('/breed', breedController.createBreed);
routerBreed.get('/breed/:id', breedController.getIdBreed);

//routerBreed.put('/breed/:id', breedController.updateIdBreed);
routerBreed.put('/breed/', breedController.updateIdBreed);

routerBreed.delete('/breed/:id', breedController.deleteIdBreed);





export default routerBreed;
