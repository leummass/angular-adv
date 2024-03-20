require('dotenv').config();

const {dbConnection} = require('./db/config')

const express = require("express");
const cors = require('cors');

//crear servidor de express
const app = express();

//configuración CORS
app.use(cors());

//base de datos
dbConnection();

//RqMI4sR9vEmy0T3u
//Rutas
app.get("/", (req, res) => {
  res.status(400).json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});
