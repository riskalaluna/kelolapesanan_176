const express = require('express');
const router = express.Router();
const bungaController = require('../controllers/bungaController');

// Tampilkan katalog bunga
router.get('/', bungaController.getBunga);

module.exports = router;
