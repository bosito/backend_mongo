const { Router } = require('express');
const authRoutes = require('./auth.js');
const calendar_eventos = require('./calendario.js');

const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v2/calendario/events', calendar_eventos);

module.exports = router;