const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import koneksi database
const upload = require('../middleware/upload'); // Import Multer middleware

// Middleware untuk cek login admin
function isAdmin(req, res, next) {
    if (req.session && req.session.admin) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

// GET: Halaman Dashboard Admin
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard'); // Pastikan file admin/dashboard.ejs sudah ada
});

// GET: Halaman Kelola Bunga
router.get('/bunga', isAdmin, (req, res) => {
    db.query('SELECT * FROM bunga', (err, results) => {
        if (err) {
            console.error('Error saat mengambil data bunga:', err);
            return res.status(500).send('Error mengambil data bunga');
        }
        res.render('admin/kelola_bunga', { bunga: results });
    });
});

// POST: Tambah Bunga Baru
router.post('/bunga', isAdmin, upload.single('gambar'), (req, res) => {
    const { nama_bunga, deskripsi, harga, stok } = req.body;
    const gambar = `/uploads/${req.file.filename}`; // Path relatif untuk gambar

    db.query(
        'INSERT INTO bunga (nama_bunga, deskripsi, harga, stok, gambar) VALUES (?, ?, ?, ?, ?)',
        [nama_bunga, deskripsi, harga, stok, gambar],
        (err) => {
            if (err) {
                console.error('Error saat menambahkan bunga:', err);
                return res.status(500).send('Error menambahkan bunga');
            }
            res.redirect('/admin/bunga');
        }
    );
});

// POST: Update Bunga
router.post('/bunga/update/:id', isAdmin, upload.single('gambar'), (req, res) => {
    const { id } = req.params;
    const { nama_bunga, deskripsi, harga, stok } = req.body;
    let query = 'UPDATE bunga SET nama_bunga = ?, deskripsi = ?, harga = ?, stok = ?';
    const params = [nama_bunga, deskripsi, harga, stok];

    // Jika ada file gambar baru, tambahkan ke query dan parameter
    if (req.file) {
        query += ', gambar = ?';
        params.push(`/uploads/${req.file.filename}`);
    }

    query += ' WHERE kd_bunga = ?';
    params.push(id);

    db.query(query, params, (err) => {
        if (err) {
            console.error('Error saat memperbarui bunga:', err);
            return res.status(500).send('Error memperbarui bunga');
        }
        res.redirect('/admin/bunga');
    });
});

// GET: Hapus Bunga
router.get('/bunga/delete/:id', isAdmin, (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM bunga WHERE kd_bunga = ?', [id], (err) => {
        if (err) {
            console.error('Error saat menghapus bunga:', err);
            return res.status(500).send('Error menghapus bunga');
        }
        res.redirect('/admin/bunga');
    });
});

module.exports = router;
