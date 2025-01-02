const db = require('../config/db');

exports.getBunga = async (req, res) => {
    try {
        const [bunga] = await db.query('SELECT * FROM bunga');
        res.render('pelanggan/katalog', { bunga });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
