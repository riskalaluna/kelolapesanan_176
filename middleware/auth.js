function isAuthenticated(req, res, next) { 
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login'); // Jika tidak ada sesi, arahkan ke halaman login
    }
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.redirect('/auth/login'); // Jika bukan admin, arahkan ke halaman login
    }
}

function isPelanggan(req, res, next) {
    if (req.session.user && req.session.user.role === 'pelanggan') {
        next();
    } else {
        res.redirect('/auth/login'); // Jika bukan pelanggan, arahkan ke halaman login
    }
}

module.exports = { isAuthenticated, isAdmin, isPelanggan };
