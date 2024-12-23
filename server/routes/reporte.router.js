import { Router } from "express";
import { reporteController } from "../controllers/reporte.Controller.js"; 

const routerReporte = Router();

routerReporte.post("/reporte/dia", reporteController.getByDia);
routerReporte.post("/reporte/semana", reporteController.getBySemana);
routerReporte.post("/reporte/semanas", reporteController.getBySemanas);
routerReporte.post("/reporte/cobros", reporteController.getByCobros);
routerReporte.post("/reporte/cobros/general", reporteController.getByCobrosGeneral);

export default routerReporte;
