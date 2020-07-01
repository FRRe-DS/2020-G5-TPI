// Cargamos el módulo de mongoose
const mongoose = require('mongoose');
// Cargamos el módulo de bcrypt
//const bcrypt = require('bcrypt');
// Definimos el factor de costo, el cual controla cuánto tiempo se necesita para calcular un solo hash de BCrypt. Cuanto mayor sea el factor de costo, más rondas de hash se realizan. Cuanto más tiempo sea necesario, más difícil será romper el hash con fuerza bruta.
//const saltRounds = 10;
//Definimos los esquemas
const Schema = mongoose.Schema;
// Creamos el objeto del esquema con sus correspondientes campos
const PacienteSchema = new Schema({

    nombre:String,
    apellido:String,
    dni:Number,
    //Direccion y localidad donde reside
    direccion:String,
    localidad:String,
    genero:String,
    fechanacimiento:String,
    telefono:Number,
    email:String,

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Paciente', PacienteSchema);