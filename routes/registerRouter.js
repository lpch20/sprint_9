const express = require('express');
const { register } = require('../controllers/resgisterController');

const app = express.Router();

app.post("/register", register)

module.exports = app;