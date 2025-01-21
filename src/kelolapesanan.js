// src/kelolapesanan.js

/**
 * Filter pesanan berdasarkan ID.
 * @param {Array} orders - Daftar pesanan.
 * @param {string} searchQuery - Query pencarian ID.
 * @returns {Array} - Daftar pesanan yang sesuai.
 */
function filterPesanan(orders, searchQuery) {
    if (!Array.isArray(orders)) throw new Error("Orders must be an array");
    if (typeof searchQuery !== "string") throw new Error("Search query must be a string");

    return orders.filter(order =>
        order.id_order.toString().toUpperCase().includes(searchQuery.toUpperCase())
    );
}

module.exports = { filterPesanan };
