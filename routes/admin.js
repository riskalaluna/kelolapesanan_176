const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/auth');

// Dashboard Admin
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard', { username: req.session.user.username });
});

module.exports = router;
