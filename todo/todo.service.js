const Todo = require('./todo.schema')

async function create(body){
   console.log('servicio',body)
   const newTodo = new Todo(body)
   const result = await newTodo.save()
   //console.log(result)
   return result
}

async function findOne(id){
   console.log(id)
   const codigo = parseInt(id)
   const todo = await Todo.findOne({ codigo },{_id:0, created_at:0, updated_at: 0})
   return todo
}

async function update(id,data){
   
}

async function findAll(){
   return await Todo.find()
}

 module.exports = {
    create,
    findOne,
    findAll
 }