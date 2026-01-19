const { conexion } = require('./database/conexion');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//const cron = require('./cron/Sendmail');

//conexion db

conexion();

const app = express();
const port = 3900;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//convertir los datos del body en un objeto js
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});


app.listen(port, () => {
  console.log("servidor corriendo en el puerto");
});