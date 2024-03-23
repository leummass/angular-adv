const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
  }
}, {collection: 'medicos'});
//reestructuración del JSON que se recibe como respuesta al consultar usuario/s
MedicoSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject();
  return object;
})

module.exports = model("Medicos", MedicoSchema);
