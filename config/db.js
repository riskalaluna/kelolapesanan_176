const mysql = require('mysql2');

// Buat koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // default user di XAMPP
  password: '', // password default di XAMPP adalah kosong
  database: 'tokobunga' // ganti dengan nama database yang Anda buat
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database.');
  }
});
