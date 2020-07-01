const {Router} = require('express');
//exporta una funcion que devuelve un objeto

const ruta = Router();

const {create, authenticate, updateById, getAll, getById, deleteById} = require('../controllers/personalAdm.js')


ruta.route('/')
    .get(getAll)

ruta.route('/:Id')
    .get(getById);

ruta.route('/update/:Id')
    .put(updateById)

ruta.route('/create/')
    .post(create);

ruta.route('/autenticar')
    .post(authenticate);

ruta.route('/delete/:Id')
    .delete(deleteById);

module.exports = ruta;