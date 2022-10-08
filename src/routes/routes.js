const { Router } = require('express');
const authRoutes = require('./auth.js');

const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/shop', authRoutes);


module.exports = router;