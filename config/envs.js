'use strict'

require('dotenv/config') 
const env = require('env-var');

//import {get } from 'env-var'

const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MONGO_URY: env.get('MONGO_URI').required().asUrlString()
}

module.exports = {envs}
//exports.module = { envs}