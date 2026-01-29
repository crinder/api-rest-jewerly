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

app.use(cors({
  origin: 'http://localhost:5173', // Tu puerto de React (Vite)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const planOptionsRouter = require('./routes/PlanOptions');
const itemsRouter = require('./routes/Items');
const sesionRouter = require('./routes/sesions');


app.use('/api/plan-options', planOptionsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/sesions', sesionRouter);

app.listen(port, () => {
  console.log("servidor corriendo en el puerto");
});