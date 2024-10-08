const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Rutas de usuario (Reg/log)
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ${PORT}');
});