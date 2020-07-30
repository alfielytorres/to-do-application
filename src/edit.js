import {initialiseEditPage} from './views'
import { getTodos, updateTodo, removeTodo } from './todo'

const todoId = location.hash.substring(1)
const todos = getTodos()

initialiseEditPage(todoId)

document.querySelector('#task-name').addEventListener('input', function(e){
    const todo = updateTodo(todoId,{
        task:e.target.value
    })
    initialiseEditPage(todoId)
})

document.querySelector('#task-body').addEventListener('input', function(e){
     const todo = updateTodo(todoId,{
        body:e.target.value
    })
    initialiseEditPage(todoId)
})

document.querySelector('#remove-button').addEventListener('click', function(){
    removeTodo(todoId)
    location.assign('index.html')
})

window.addEventListener('storage', function(e){
    if(e.key=="todos"){
       initialiseEditPage(todoId)
    }
})