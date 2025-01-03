const mysql = require('mysql');

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost', // Ganti dengan host database Anda
    user: 'root', // Ganti dengan username database Anda
    password: '', // Ganti dengan password database Anda
    database: 'tokobunga', // Ganti dengan nama database Anda
});

// Sambungkan ke database
db.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal:', err.stack);
        return;
    }
    console.log('Terhubung ke database');
});

module.exports = db;
