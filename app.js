//const { envs } = require('./config/envs');
const { envs } = require('./config/envs');
const express = require('express');
const helmet = require('helmet')
const mongoose = require('mongoose');
var cors = require('cors');

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
  app.use(cors());

/*   app.get('/',(req,rest)=>{
    console.log('Hola mundo')
    rest.status(200).json({messaje:'Hola Mundo'})
  }) */
  //! Cargar las rutas
  app.use(router)

/*   app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin, X-Requested-With, Content-Type, Accept,access-control-allow-origin');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
    next();
}); */
  //!Levantar Servidor en el puerto que se configuro en el archivo .env
  const mongoConection = await mongoose.connect(envs.MONGO_URY,{useNewUrlParser: true})
//.then(()=>console.info('Conectado a mongodb.....'))
//.catch(error=>console.error('error al conectar a la base de datos', error));


  app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`)
  })
 
}