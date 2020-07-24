//saved todos
const getSavedTodos = function(){
    
    const todosJSON = localStorage.getItem('todos')
    if(todosJSON!==null){
        return JSON.parse(todosJSON)
    }else{
        return []
    }
}



//update todos
const saveTodos = function(todos){
    localStorage.setItem("todos", JSON.stringify(todos))
}

const removeTodo = function(id){
    const todoIndex = todos.findIndex(function (todo){
        return todo.id === id
    })
    if(todoIndex!== -1){
        console.log(todoIndex)
        todos.splice(todoIndex,1)
    }   
}

const toggleTodo = function(id){
    const todoIndex = todos.findIndex(function (todo){
        return todo.id === id
    })
    if(todoIndex!==-1){
       todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted
    }
   
}




// generate todo dom  
const generateTodoDOM = function(todo){
        const task = document.createElement('div')    

        //done button switch 
            //div for switch
            const doneDiv = document.createElement('div')
            doneDiv.setAttribute('class', 'form-check form-switch grouped-buttons')
            
            //checkbox for switch
            const doneButton = document.createElement('input')
            doneButton.setAttribute('type','checkbox')
            doneButton.setAttribute('class','form-check-input ')
            doneButton.setAttribute('id','flexSwitchCheckDefault')

            doneButton.checked=todo.isCompleted
            doneButton.addEventListener('change', function(){
                toggleTodo(todo.id)
                saveTodos(todos)
                renderTodos(todos,filters)
            })

            //add labels
            const doneLabel = document.createElement('label')
            doneLabel.setAttribute('class','form-check-label')
            doneLabel.setAttribute('for','flexSwitchCheckDefault')
            doneLabel.textContent='Done'

            doneDiv.appendChild(doneButton)
            doneDiv.appendChild(doneLabel)

        //delete button
        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('class','btn btn-dark grouped-buttons')
        deleteButton.textContent='Delete'

        deleteButton.addEventListener('click', function(){
            removeTodo(todo.id)
            renderTodos(todos,filters)
        })


        //buttons div
        const buttons = document.createElement('div')
        buttons.setAttribute('class','grouped-buttons-div')

        //task
        task.setAttribute('class','alert alert-primary task-item todo' )
        task.textContent = todo.task

        task.appendChild(buttons)
        buttons.appendChild(deleteButton)
        buttons.appendChild(doneDiv)

        return task
}
// generate todos left dom  
const generateNotificationPanelDOM = function(incompleteTodos){
    document.querySelector('#tasks').innerHTML = ''
    document.querySelector('#notify').innerHTML = ''
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#notify').appendChild(summary)

}

//render the UI 
const renderTodos = function(todos, query){

    //find the filtered todos
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.task.includes(filters.searchTerm)
        const hideCompletedMatch = !filters.hideCompleted || !todo.isCompleted
        return searchTextMatch && hideCompletedMatch
    })

    //check which filtered to do is completed
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.isCompleted
        

    })

    //generate a UI to show which todos are completed
    generateNotificationPanelDOM(incompleteTodos)
   
    filteredTodos.forEach(function (todo) {
        
        const card = generateTodoDOM(todo)
        const tasks = document.getElementById('tasks')
        tasks.appendChild(card)
    })
}


