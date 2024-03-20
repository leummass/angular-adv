require("dotenv").config();

const { dbConnection } = require("./db/config");

const express = require("express");
const cors = require("cors");

//crear servidor de express
const app = express();

//configuración CORS
app.use(cors());

//read y parse de body
app.use(express.json());

//conexión a la base de datos
dbConnection();

//RqMI4sR9vEmy0T3u pwd mongo
//Rutas
app.use("/api/usuarios", require("./routes/usuarios.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});
