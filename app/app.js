const express = require('express');
const cors = require('cors');

require('../middleware/logger')();

const app = express.Router();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['authorization'],
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/', require('../routes'));

module.exports = app;
