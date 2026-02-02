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

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const planOptionsRouter = require('./routes/PlanOptions');
const itemsRouter = require('./routes/Items');
const sesionRouter = require('./routes/sesions');
const transactionRouter = require('./routes/transactions');
const userRouter = require('./routes/User');

app.use('/api/plan-options', planOptionsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/sesions', sesionRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log("servidor corriendo en el puerto");
});