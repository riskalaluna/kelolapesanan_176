const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM bunga', (err, results) => {
        if (err) throw err;
        const isLoggedIn = req.session.user ? true : false;
        const username = isLoggedIn ? req.session.user.nama_pelanggan : null;
        res.render('pelanggan/dashboard', {
            bunga: results,
            isLoggedIn: isLoggedIn,
            username: username,
        });
    });
});


router.post('/beli', (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    const { kd_bunga, jumlah } = req.body;
    db.query('SELECT * FROM bunga WHERE kd_bunga = ?', [kd_bunga], (err, results) => {
        if (err) throw err;
        if (results.length > 0 && results[0].stok >= jumlah) {
            const totalHarga = results[0].Harga * jumlah;
            db.query('INSERT INTO pesanan (id_pelanggan, kd_pesanan, tgl_pesan, total_harga) VALUES (?, ?, NOW(), ?)',
                [req.session.user.id_pelanggan, `${Date.now()}`, totalHarga], (err) => {
                    if (err) throw err;
                    db.query('UPDATE bunga SET stok = stok - ? WHERE kd_bunga = ?', [jumlah, kd_bunga], (err) => {
                        if (err) throw err;
                        res.redirect('/pelanggan');
                    });
                });
        } else {
            res.send('Stok tidak mencukupi.');
        }
    });
});

module.exports = router;