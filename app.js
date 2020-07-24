let todos = getSavedTodos()

const filters = {
    searchTerm:'',
    hideCompleted:false
}

// Create 
document.querySelector('#add-form').addEventListener('submit', function(e){
    e.preventDefault() //allows us to handle the form submission
    const taskText = e.target.elements.task.value
    todos.push({
        id:uuidv4(),
        task:taskText,
        isCompleted:false
    })
    saveTodos(todos)
    console.log(todos)
    renderTodos(todos, filters)

})

// delete
document.querySelector('#reset').addEventListener('click', function(){
    document.querySelectorAll('.task-item').forEach(function(item){
        todos.pop()
        item.remove()
    })  
    localStorage.clear()
    renderTodos(todos, filters)
})

// search
document.querySelector('#search').addEventListener('input', function(input){
    filters.searchTerm = input.target.value
    console.log(renderTodos(todos,filters.searchTerm))
    renderTodos(todos, filters)
})

// hide
document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos,filters)
})


renderTodos(todos,filters)


