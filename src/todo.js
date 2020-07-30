import uuidv4 from 'uuid/v4'
import moment from 'moment'


let todos=[]

const loadTodos = function(){
    
    const todosJSON = localStorage.getItem('todos')
    if(todosJSON!==null){
        return JSON.parse(todosJSON)
    }else{
        return []
    }
}



//exported functions

//retrieve
const getTodos = () => todos


//create
const createTodo = (title) => {
    const id=uuidv4()
    const timestamp=  moment().valueOf()

    todos.push({
        id:id,
        task:title,
        body:"",
        isCompleted:false,
        createdAt:timestamp,
        updatedAt:timestamp
    })
    saveTodos()

    return id
}

//update
const saveTodos = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
}

todos = loadTodos()


//delete
const removeTodo = (id)=>{
    const todoIndex = todos.findIndex((todo)=> todo.id === id)

    if(todoIndex!== -1){
        todos.splice(todoIndex,1)
        saveTodos()
    }   
}

//sort 

const sort = (sortBy)=>{
    if(sortBy==="byEdited"){
        return todos.sort(function(a,b){
            if(a.updatedAt>b.updatedAt){
                return -1
            } else if (a.updatedAt <b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy==="byCreated"){
        return todos.sort(function(a,b){
            if(a.createdAt>b.createdAt){
                return -1
            } else if (b.createdAt < a.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy==="alphabetical"){
        return todos.sort(function(a,b){
            if(a.task.toLowerCase()<b.task.toLowerCase()){
                return -1
            } else if (b.task.toLowerCase() < b.task.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })

    }else{
        return todos
    }

    
    
}


const updateTodo = (id, updates) => {
    const todo = todos.find((todo)=>todo.id===id)
    if(!todo){
        return
    }

    if(typeof updates.task ==='string'){
        todo.task = updates.task
        todo.updatedAt = moment().valueOf()
    }

    if(typeof updates.body ==='string'){
        todo.body = updates.body
        todo.updatedAt = moment().valueOf()
    }

    saveTodos()

    return todo
}




export {getTodos, createTodo, saveTodos, removeTodo, sort, updateTodo}


