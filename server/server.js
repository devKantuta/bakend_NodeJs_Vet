import express from "express";
import "dotenv/config";
import cors from "cors";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";


/* IMPOTAR ROUTES */
import routerBreed from "./routes/breed.router.js";
import routerSpecie from "./routes/specie.router.js";
import loginRouter from "./controllers/usersController.js";
import routerClient from "./routes/cliente.router.js";
import routerTurno from "./routes/turno.router.js";
import routerEmpleado from "./routes/empleado.router.js";
import routerRaza from "./routes/raza.router.js";
import routerMascota from "./routes/mascota.router.js";
import routerHistoriClinica from "./routes/historiaClinica.router.js";
import routerConsulta from "./routes/consulta.router.js";
import routerReporte from "./routes/reporte.router.js";

/* INSTANCIANDO VARIABLES */
const app = express();

/* VARIABLES GLOBALES  */
app.set('port', config.port);

/* MIDDLEWARES */
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));//lea imagens
app.use(cors());


/* USO DE ARCHIVOS ESTATICOS */
app.use(express.static('frontend'))

/* USE ROOUTES */
app.get("/", (req, res) => {
  res.send(`<h1> Backend con NodeJs and Postgres + CRUD </h1>`);
});
app.use('/api', routerBreed);
app.use('/api', loginRouter);
app.use('/api', routerClient);
app.use('/api', routerTurno);
app.use('/api', routerEmpleado);
app.use('/api', routerSpecie);
app.use('/api', routerRaza);
app.use('/api', routerMascota);
app.use('/api', routerHistoriClinica);
app.use('/api', routerConsulta);
app.use('/api', routerReporte);

/* ON SERVER */
app.listen(app.get('port'), () => {
  console.log(`On server Port :${app.get('port')}`);
});

