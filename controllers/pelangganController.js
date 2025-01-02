const db = require('../config/db');

exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM pelanggan WHERE usn_pelanggan = ? AND pw_pelanggan = ?', [username, password]);
        if (user.length) {
            req.session.user = user[0];
            return res.redirect('/bunga');
        }
        res.redirect('/pelanggan/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getSignup = (req, res) => {
    res.render('auth/signup');
};

exports.postSignup = async (req, res) => {
    const { username, password, nama, alamat } = req.body;
    try {
        await db.query('INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, pw_pelanggan, usn_pelanggan, alamat) VALUES (?, ?, ?, ?, ?)', [
            `PLG${Date.now()}`, nama, password, username, alamat
        ]);
        res.redirect('/pelanggan/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
