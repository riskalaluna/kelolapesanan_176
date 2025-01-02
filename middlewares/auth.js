function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

function isPelanggan(req, res, next) {
    if (req.session.user && req.session.user.role === 'pelanggan') {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = { isAuthenticated, isAdmin, isPelanggan };
