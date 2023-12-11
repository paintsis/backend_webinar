//const { envs } = require('./config/envs');
const { envs } = require('./config/envs');
const express = require('express');
const helmet = require('helmet')
const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

//importacines para logs 
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

const app = express();
const router = require('./routes')
//import { envs } from "./config/envs";


const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});


  //
  (() => {
    main();
  })()



async function main() {

  const PORT = envs.PORT || 3000

  app.use(morgan('combined', { stream: accessLogStream }))
  app.use(helmet())

  //*Parsear el body a JSON  
  app.use(express.json())

  //*Parsear el body de www-urlencoded
  app.use(express.urlencoded({ extended: true }))

/*   app.get('/',(req,rest)=>{
    console.log('Hola mundo')
    rest.status(200).json({messaje:'Hola Mundo'})
  }) */
  //! Cargar las rutas
  app.use(router)
  
  //!Levantar Servidor en el puerto que se configuro en el archivo .env
  const mongoConection = await mongoose.connect(envs.MONGO_URY,{useNewUrlParser: true})
//.then(()=>console.info('Conectado a mongodb.....'))
//.catch(error=>console.error('error al conectar a la base de datos', error));

  const AutoIncrement = AutoIncrementFactory(mongoConection);

  app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`)
  })
  //Todo: await base de dato  s
  //Todo: inicio de nuestro server
  //console.log(envs.PORT)
  // console.log(envs)
}