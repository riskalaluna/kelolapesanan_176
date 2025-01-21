// test/kelolapesanan.test.js

const { filterPesanan } = require('../src/kelolapesanan');

describe('filterPesanan', () => {
    const sampleOrders = [
        { id_order: "123", jumlah: 2, tanggal_pesanan: "2024-01-01", total_harga: 50000 },
        { id_order: "456", jumlah: 1, tanggal_pesanan: "2024-01-02", total_harga: 30000 },
        { id_order: "789", jumlah: 3, tanggal_pesanan: "2024-01-03", total_harga: 75000 },
    ];

    test('mengembalikan pesanan yang sesuai dengan ID', () => {
        const result = filterPesanan(sampleOrders, "123");
        expect(result).toEqual([{ id_order: "123", jumlah: 2, tanggal_pesanan: "2024-01-01", total_harga: 50000 }]);
    });

    test('mengembalikan semua pesanan yang cocok dengan substring ID', () => {
        const result = filterPesanan(sampleOrders, "4");
        expect(result).toEqual([
            { id_order: "456", jumlah: 1, tanggal_pesanan: "2024-01-02", total_harga: 30000 }
        ]);
    });

    test('mengembalikan array kosong jika tidak ada kecocokan', () => {
        const result = filterPesanan(sampleOrders, "999");
        expect(result).toEqual([]);
    });

    test('tidak case-sensitive saat mencocokkan ID', () => {
        const result = filterPesanan(sampleOrders, "ABC");
        expect(result).toEqual([]);
    });

    test('melempar error jika orders bukan array', () => {
        expect(() => filterPesanan(null, "123")).toThrow("Orders must be an array");
    });

    test('melempar error jika searchQuery bukan string', () => {
        expect(() => filterPesanan(sampleOrders, 123)).toThrow("Search query must be a string");
    });
});
