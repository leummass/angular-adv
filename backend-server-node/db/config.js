const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CNN,
    );
    console.log('Conexión a la BD exitosa')
  } catch (error) {

    console.log(error);
    throw new Error("Error a la hora de iniciar conexión con la base de datos");

  }
};

module.exports = {
    dbConnection
}
