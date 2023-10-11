const express = require('express');
const { login } = require('../controllers/loginController');

const app = express.Router();

app.post("/login", login)

module.exports = app;