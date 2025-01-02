const db = require('../config/db');

exports.createPesanan = async (req, res) => {
    if (!req.session.user) return res.redirect('/pelanggan/login');
    const { bungaId, jumlah } = req.body;
    try {
        const [bunga] = await db.query('SELECT * FROM bunga WHERE kd_bunga = ?', [bungaId]);
        if (bunga.length && bunga[0].stok >= jumlah) {
            const totalHarga = bunga[0].harga * jumlah;
            await db.query('INSERT INTO pesanan (id_pelanggan, kd_pesan, tgl_pesan, total_harga) VALUES (?, ?, ?, ?)', [
                req.session.user.id_pelanggan,
                `PES${Date.now()}`,
                new Date(),
                totalHarga
            ]);
            await db.query('UPDATE bunga SET stok = stok - ? WHERE kd_bunga = ?', [jumlah, bungaId]);
            res.redirect('/pesanan');
        } else {
            res.send('Stok tidak cukup!');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getPesananPelanggan = async (req, res) => {
    if (!req.session.user) return res.redirect('/pelanggan/login');
    try {
        const [pesanan] = await db.query('SELECT * FROM pesanan WHERE id_pelanggan = ?', [req.session.user.id_pelanggan]);
        res.render('pelanggan/pesanan', { pesanan });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
