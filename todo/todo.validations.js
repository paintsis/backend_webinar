const express = require('express');
const router = express.Router();
const Joi = require('joi');

//MiddleWare para la validacion del esquema
const validateRequest = require('../middleware/validate_request');

function todoValidation(todo) {
    
    const schema = Joi.object({
        codigo: Joi.number().required(),
        titulo: Joi.string().required(),
        descripcion: Joi.string().required(),
        estado: Joi.string().required()
    });
    const  validation = schema.validate(todo)

    const { value, error } = validation; 

    if(error){
        return  error.details.map((x => {
            return { message: x.message, path: x.path[0] }
        }));
    }
    return true
   // validateRequest(req, next, schema);
}


function todoUpdateValidation(todo) {
    
    const schema = Joi.object({
       
        titulo: Joi.string().optional(),
        descripcion: Joi.string().optional(),
        estado: Joi.string().optional()
    });
    const  validation = schema.validate(todo)
    
    const { value, error } = validation; 

    if(error){
        return  error.details.map((x => {
            return { message: x.message, path: x.path[0] }
        }));
    }
    return true
   // validateRequest(req, next, schema);
}


module.exports = { todoValidation, todoUpdateValidation }