// authController.js
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Verifikasi admin
    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        req.session.isAdmin = true; // Tandai user sebagai admin
        return res.redirect('/admin/dashboard'); // Redirect ke dashboard admin
    }

    // Jika bukan admin, tampilkan error
    res.render('auth/login', { error: 'Username atau password salah!' });
};

exports.logout = (req, res) => {
    req.session.destroy(); // Hapus session
    res.redirect('/'); // Kembali ke halaman utama
};
