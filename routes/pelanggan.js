const express = require('express');
const router = express.Router();
const { isPelanggan } = require('../middlewares/auth');
const db = require('../config/db');

// Dashboard Pelanggan
router.get('/dashboard', isPelanggan, async (req, res) => {
    try {
        const [bunga] = await db.query('SELECT * FROM bunga');
        res.render('pelanggan/dashboard', { bunga, username: req.session.user.username });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Buat Pesanan
router.post('/pesanan', isPelanggan, async (req, res) => {
    const { bungaId, jumlah } = req.body;

    try {
        await db.query('INSERT INTO pesanan (pelanggan_id, bunga_id, jumlah) VALUES (?, ?, ?)', [
            req.session.user.id,
            bungaId,
            jumlah,
        ]);
        res.redirect('/pelanggan/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
