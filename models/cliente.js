// Modelo de datos mongoDB: cliente.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// modelo de datos de cliente
var Cliente = new Schema({
  idCliente:  { type: Number, require: true },
  idContador: { type: Number, require: true },
  potencia:   { type: Number, 
                enum: [1.3, 2.3, 3.45, 4.6, 5.75, 6.9, 9.2, 10.236, 13.450],
                require: true },
  tarifa:     { type: Number,
                enum: [2.0, 2.1, 3.0],
                require: true },
  direccion:  { type: String, required: false },
  importe :   { type: Number, require: true },
  modificado: { type: Date, default: Date.now }    
});

// Cliente.path('model').validate(function (v) {
//     return ((v != "") && (v != null));
// });

module.exports = mongoose.model('Cliente', Cliente);