const { Router } = require('express');
const authRoutes = require('./auth.js');

const router = Router();

router.use('/api/auth', authRoutes);

module.exports = router;