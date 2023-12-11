'use strict'
const Joi = require('joi');
const service = require('./todo.service');
const validations = require('./todo.validations');
const { json } = require('express');


async function create(req, res){
    const validate = validations.todoValidation(req.body) //schema.validate(req.body);
    if(validate instanceof Array){
        res.status(422).json({error: validate})
        return
    }
    const result = await service.create(req.body)
    res.status(200).json(result)

}

async function getAll(req, res){
    const response = await service.findAll()
    res.status(200).json(response)
}

async function findOne(req,res){
    const params = req.params;
    const { id } = params;
    const todo = await service.findOne(id)
    if(todo){
        res.status(200).send(todo)
        return
    }
    res.status(400).json({messge:'Registro no existente'})
}


/**
 * Funcion para la actualizacion del registro
 */
async function update(req, res){
    const params = req.params;
    const body = req.body;
    const { id } = params;
    const validate = validations.todoUpdateValidation(req.body)
    if(validate instanceof Array){
        res.status(422).json({error: validate})
        return
    }
    const updated = await service.update(+id, body)
    if(updated){
        res.status(200).send(updated)
    }
}

// routes
//router.get('/', getAll);
module.exports = { getAll, create, findOne, update };