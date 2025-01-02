const db = require('../config/db');

exports.getLogin = (req, res) => {
    res.render('admin/login');
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'diemaja') {
        req.session.admin = true;
        return res.redirect('/admin/dashboard');
    }
    res.redirect('/admin/login');
};

exports.getDashboard = (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    res.render('admin/dashboard');
};

exports.getBunga = async (req, res) => {
    try {
        const [bunga] = await db.query('SELECT * FROM bunga');
        res.render('admin/bunga', { bunga });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.addBunga = async (req, res) => { // Nama fungsi diperbaiki
    const { nama, deskripsi, harga, stok, gambar } = req.body;
    try {
        await db.query('INSERT INTO bunga (kd_bunga, nama_bunga, deskripsi, harga, stok, gambar) VALUES (?, ?, ?, ?, ?, ?)', [
            `B${Date.now()}`, nama, deskripsi, harga, stok, gambar
        ]);
        res.redirect('/admin/bunga');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateBunga = async (req, res) => { // Tambahkan jika diperlukan
    const { id } = req.params;
    const { nama, deskripsi, harga, stok } = req.body;
    try {
        await db.query('UPDATE bunga SET nama_bunga = ?, deskripsi = ?, harga = ?, stok = ? WHERE kd_bunga = ?', [
            nama, deskripsi, harga, stok, id
        ]);
        res.redirect('/admin/bunga');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteBunga = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM bunga WHERE kd_bunga = ?', [id]);
        res.redirect('/admin/bunga');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getPesanan = async (req, res) => {
    try {
        const [pesanan] = await db.query(`
            SELECT pesanan.*, pelanggan.nama_pelanggan 
            FROM pesanan 
            JOIN pelanggan ON pesanan.id_pelanggan = pelanggan.id_pelanggan
        `);
        res.render('admin/pesanan', { pesanan });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
