const personalAdmModel = require('../models/personalAdm');
const hospitalModel = require('../models/hospital');
//
// Cargamos el módulo de bcrypt
const bcrypt = require('bcrypt');
// Cargamos el módulo de jsonwebtoken
const jwt = require('jsonwebtoken');

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {
    create: function (req, res, next) {

        personalAdmModel.create ({
                apynombre: req.body.apynombre,
                telefono: req.body.telefono,
                password: req.body.password,
                email: req.body.email,
                consulta: req.body.consulta,
                descripcion: req.body.descripcion

            },
            function (err, result) {
                if (err)
                    next(err);
                else
                    res.json({status: "Ok", message: "Personal Administrativo agregado exitosamente!!!", data: result });

            });
    },
    asigHospital: async function(req,res) {
        // crear medico para el hospital
        const PersonalAdmN = new personalAdmModel(req.body)
        //buscar el hospital para asignar un medico
        const hospital = await hospitalModel.findById(req.params)
        //asignar el hospital como lugar de trabajo del medico
        PersonalAdmN.hospitals =hospital
        //guardamos el medico para hospital
        await PersonalAdmN.save()
        //asignar el medico dentro del array de medicos del hospital
        hospital.personalAdms.push(PersonalAdmN)
        //guardar el medico
        await hospital.save();
        //enviar al hospital el medico
        res.send(PersonalAdmN)
    },
    authenticate: function (req, res ) {
        const {apynombre, password} = req.body;
        personalAdmModel.findOne({apynombre}, (err, personalAdm) => {
            if(err){
                res.status(500).send('ERROR AL AUTENTICAR PERSONAL ADMINISTRATIVO');
            } else if (!personalAdm) {
                res.status(500).send('EL PERSONAL ADMINISTRATIVO NO EXISTE');
            }else {
                personalAdm.isCorrectPassword(password, (err,result)=>{
                    if(err){
                        res.status(500).send('ERROR AL AUTENTICAR');
                    } else if (result) {
                        res.status(200).send('PERSONAL ADMINISTRATIVO AUTENTICADO CORRECTAMENTE');
                    }else {
                        res.status(500).send('PERSONAL ADMINISTRATIVO Y/O CONTRASENA INCORRECTA');
                    }

                });
            }
        });
    },
    getById: function (req, res, next) {
        console.log(req.body);
        personalAdmModel.findById(req.params.Id, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({status: "success", message: "Personal Administrativo found!!!", data: {personalAdm:result}});
            }
        });
    },
//Metodo para retornar todos los videojuegos registrados en la base de datos
    getAll: function (req, res, next) {
        let personalAdmList = [];
        personalAdmModel.find({}, function (err, personalAdm) {
            if (err) {
                next(err);
            } else {
                for (let personal of personalAdm) {
                    personalAdmList.push({id: personal._id,
                        apynombre: personal.apynombre,
                        telefono: personal.telefono,
                        password: personal.password,
                        email: personal.email,
                        consulta: personal.consulta,
                        descripcion: personal.descripcion});
                }
                res.json({status: "success", message: "Personal Administrativo list found!!!", data: {personalAdm: personalAdmList}});

            }
        });
    },
//Metodo para actualizar algun registro de la base de datos por ID
    updateById: (req, res) => {
        // Recogemos un parámetro por la url
        var personalAdmId = req.params.Id;

        // Recogemos los datos que nos llegen en el body de la petición
        var update = req.body;

        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        personalAdmModel.findByIdAndUpdate(personalAdmId, update, {new:true}, (err, personalAdmUpdated) => {
            if(err) return res.status(500).send({message: 'Error en el servidor'});

            if(personalAdmUpdated){
                return res.status(200).send({
                    nota: personalAdmUpdated
                });
            }else{
                return res.status(404).send({
                    message: 'No existe la nota'
                });
            }

        });
    },
//Metodo para eliminar algun registro de la base de datos por ID
    deleteById: (req, res) => {
        var personalAdmId = req.params.Id;

        // Buscamos por ID, eliminamos el objeto y devolvemos el objeto borrado en un JSON
        personalAdmModel.findByIdAndRemove(personalAdmId, (err, personalAdmRemoved) => {
            if(err) return res.status(500).send({ message: 'Error en el servidor' });

            if(personalAdmRemoved){
                return res.status(200).send({
                    nota: personalAdmRemoved
                });
            }else{
                return res.status(404).send({
                    message: 'No existe la nota'
                });
            }

        });
    },
}