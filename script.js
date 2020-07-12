const todos = []
const filters = {
    searchTerm:''
}

document.querySelector('#add').addEventListener('click', function(){
    const tasks = document.getElementById('tasks')
    const taskText = document.getElementById('input').value
    todos.push({task:taskText,isCompleted:false})

    const task = document.createElement('div')
    task.setAttribute('class','alert alert-primary task-item' )
    task.textContent = taskText
    tasks.appendChild(task)
    
    console.log(todos)
})

document.querySelector('#reset').addEventListener('click', function(){
    document.querySelectorAll('.task-item').forEach(function(item){
        todos.pop()
        item.remove()
    })
    
    console.log(todos)
})

document.querySelector('#search').addEventListener('input', function(input){
        filters.searchTerm = input.target.value
        console.log(renderTodos(todos,filters.searchTerm))
})

const renderTodos = function(todos, query){
    
    const filteredTodos = todos.filter(function(item){
        return item.task.includes(query)
    })


    const tasks = document.getElementById('tasks')

    //clear the list 
    document.querySelectorAll('.task-item').forEach(function(item){
        item.remove()
    })

    //populate filtered list
    filteredTodos.forEach(function(item){
        const task = document.createElement('div')
        task.setAttribute('class','alert alert-primary task-item' )
        task.textContent = item.task
        tasks.appendChild(task)
    })
    return filteredTodos
}


