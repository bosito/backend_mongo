const { Router } = require('express');
const authRoutes = require('./auth.js');
const calendar_eventos = require('./calendario.js');

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/calendario/events', calendar_eventos);

module.exports = router;