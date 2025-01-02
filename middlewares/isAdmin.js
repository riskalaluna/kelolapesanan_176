function isAdmin(req, res, next) {
    if (!req.session.admin) {
        return res.redirect('/login'); // Redirect ke halaman login jika bukan admin
    }
    next(); // Lanjut ke rute berikutnya jika admin
}

module.exports = isAdmin;
