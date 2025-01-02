const express = require('express');
const router = express.Router();
const pesananController = require('../controllers/pesananController');

// Buat pesanan
router.post('/create', pesananController.createPesanan);

// Lihat pesanan pelanggan
router.get('/', pesananController.getPesananPelanggan);

module.exports = router;
