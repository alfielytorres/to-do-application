let todos = getSavedTodos()

const filters = {
    searchTerm:'',
    hideCompleted:false
}

// Create 
document.querySelector('#add-form').addEventListener('submit', function(e){
    e.preventDefault() //allows us to handle the form submission
    const taskText = e.target.elements.task.value
    const uuid=uuidv4()
    const createdAt= new moment()
    const timestamp = createdAt.valueOf()
    console.log(timestamp)
    
    todos.push({
        id:uuid,
        task:taskText,
        body:"",
        isCompleted:false,
        createdAt:timestamp,
        updatedAt:timestamp
    })
    saveTodos(todos)
    console.log(todos)
    renderTodos(todos, filters)

    const baseURL = 'edit_page.html'
    let toDoURL = `${baseURL}#${uuid}`

    location.assign(toDoURL)
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


window.addEventListener('storage', function(e){
    

    if(e.key=="todos"){
        const newTodos = JSON.parse(e.newValue)
        
        
        renderTodos(newTodos,filters)

       
       
    }
    
})


document.querySelector('#filter-by').addEventListener('change', function (e) {
    if(e.target.value==="byEdited"){
        todos.sort(function(a,b){
            if(a.updatedAt>b.updatedAt){
                return -1
            } else if (a.updatedAt <b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
        document.querySelector('#tasks').textContent= ''
        renderTodos(todos,filters)
    }else if(e.target.value==="byCreated"){
        todos.sort(function(a,b){
            if(a.createdAt>b.createdAt){
                return -1
            } else if (b.createdAt < a.createdAt){
                return 1
            }else{
                return 0
            }
        })
        document.querySelector('#tasks').textContent= ''
        renderTodos(todos,filters)
    }else if(e.target.value==="alphabetical"){
        todos.sort(function(a,b){
            if(a.task.toLowerCase()<b.task.toLowerCase()){
                return -1
            } else if (b.task.toLowerCase() < b.task.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })
        document.querySelector('#tasks').textContent= ''
        renderTodos(todos,filters)

    }else{
        console.log("error")
    }

    
    
})