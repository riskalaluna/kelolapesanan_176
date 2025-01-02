const express = require('express');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const pelangganRoutes = require('./routes/pelanggan');

app.set('view engine', 'ejs');
app.set('views', './views'); // Pastikan folder views ada di root proyek

// Middleware Session
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware Parsing Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rute untuk halaman utama
app.get('/', (req, res) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else if (req.session.user.role === 'pelanggan') {
            res.redirect('/pelanggan/dashboard');
        }
    } else {
        res.render('home'); // Pastikan file `home.ejs` ada di folder views
    }
});

// Rute lainnya
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/pelanggan', pelangganRoutes);

// Jalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));