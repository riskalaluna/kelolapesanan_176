const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Halaman Login
router.get('/login', (req, res) => {
    res.render('auth/login', { error: null });
});

// Proses Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (users.length > 0) {
            const user = users[0];

            // Simpan data ke session
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role, // role: 'admin' atau 'pelanggan'
            };

            if (user.role === 'admin') {
                res.redirect('/admin/dashboard');
            } else if (user.role === 'pelanggan') {
                res.redirect('/pelanggan/dashboard');
            }
        } else {
            res.render('auth/login', { error: 'Username atau password salah!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Halaman Signup
router.get('/signup', (req, res) => {
    res.render('auth/signup', { error: null });
});

// Proses Signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Tambahkan user ke database
        await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, 'pelanggan']);
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.render('auth/signup', { error: 'Gagal mendaftar. Coba lagi!' });
    }
});

module.exports = router;
