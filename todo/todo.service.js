const Todo = require('./todo.schema')


/**
 * 
 * @param { object } body 
 * @returns 
 */
async function create(body){
   console.log('servicio',body)
   const newTodo = new Todo(body)
   const result = await newTodo.save()
   //console.log(result)
   return result
}

/**
 * 
 * @param { number } id 
 * @returns 
 */
async function findOne(id){
   console.log(id)
   const codigo = parseInt(id)
   const todo = await Todo.findOne({ codigo },{_id:0, created_at:0, updated_at: 0})
   return todo
}

/**
 * 
 * @param { number } id 
 * @param { object } data 
 */
async function update(id,data){
   const updated = await Todo.findOneAndUpdate({codigo:id},data,{new: true})
   return updated
}

async function findAll(){
   return await Todo.find()
}

 module.exports = {
    create,
    findOne,
    findAll,
    update
 }