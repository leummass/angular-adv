const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  }
}, {collection: 'hospitales'});
//reestructuración del JSON que se recibe como respuesta al consultar usuario/s
HospitalSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject();
  return object;
})

module.exports = model("Hospital", HospitalSchema);
