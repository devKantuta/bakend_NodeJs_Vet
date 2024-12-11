
// CORS : se usa para que comuniquen en dominios diferentes sino sale error-cruzado
 
const optionsCors = {
  origin: "https://deteccionplaga.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(optionsCors));


/* ESTA FORMA POR EL MOMENTO E VISTO Q ES PARA PRODUCCION */
const conn_pgSql = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized:false }
})