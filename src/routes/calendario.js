/*
    rutas de usurio / calendario
    host * /api/calendario/events
*/

const { Router } = require('express');
const {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} = require('../controller/calendar.eventos');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validateJWT)

router.get('/', getEventos);

router.post('/', crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;