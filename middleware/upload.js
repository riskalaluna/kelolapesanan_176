const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan untuk Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Lokasi folder untuk menyimpan file
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        // Format nama file: timestamp + ekstensi asli
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Filter untuk memastikan hanya file gambar yang diterima
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File yang diunggah bukan gambar!'), false);
    }
};

// Konfigurasi Multer
const upload = multer({ 
    storage,
    fileFilter,
});

module.exports = upload;
