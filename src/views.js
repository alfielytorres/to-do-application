import moment from 'moment'
import { getFilters } from './filters'
import { sort, getTodos,saveTodos } from './todo'


// generate todo dom  
const generateTodoDOM = (todo) =>{
        
    // add edit 
    const baseURL = 'edit_page.html'
    let toDoURL = `${baseURL}#${todo.id}`

    const editLink = document.createElement('a')
    editLink.setAttribute('class', 'link-primary edit grouped-buttons')
    editLink.setAttribute('href', toDoURL)

    editLink.textContent = "✏️"
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
        doneButton.addEventListener('change', ()=>{
            toggleTodo(todo.id)
            saveTodos()
            renderTodos()
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

    deleteButton.addEventListener('click', ()=>{
        removeTodo(todo.id)
        saveTodos()
        renderTodos(todos,filters)
    })


    //buttons div
    const buttons = document.createElement('div')
    buttons.setAttribute('class','grouped-buttons-div')

    //task
    const task = document.createElement('div')    
    task.setAttribute('class','alert alert-primary task-item todo' )
    const created = moment(todo.createdAt)
    const updated = moment(todo.updatedAt)
    task.textContent = `
    ${todo.task} 
    edited ${updated.fromNow()}
    `
    
    

 
    task.appendChild(buttons)
    buttons.appendChild(editLink)
    buttons.appendChild(deleteButton)
    buttons.appendChild(doneDiv)
    
    
    

    return task
}
// generate todos left dom  
const generateNotificationPanelDOM = (incompleteTodos) => {
    document.querySelector('#tasks').innerHTML = ''
    document.querySelector('#notify').innerHTML = ''
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#notify').appendChild(summary)

}

const toggleTodo = (id)=>{

    const todos = getTodos()
    const todoIndex = todos.findIndex(function (todo){
        return todo.id === id
    })
    if(todoIndex!==-1){
       todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted
    }
   
}


//render the UI 
const renderTodos = () =>{
    const filters = getFilters()
    const todos = sort(filters.sortBy)

    

    //find the filtered todos
    const filteredTodos = todos.filter( (todo)=> {
        const searchTextMatch = todo.task.includes(filters.searchTerm)
        const hideCompletedMatch = !filters.hideCompleted || !todo.isCompleted
        return searchTextMatch && hideCompletedMatch
    })

    //check which filtered to do is completed
    const incompleteTodos = filteredTodos.filter( (todo)=> {
        return !todo.isCompleted
        

    })

    //generate a UI to show which todos are completed
    generateNotificationPanelDOM(incompleteTodos)

    filteredTodos.forEach( (todo) =>{
        const card = generateTodoDOM(todo)
        const tasks = document.getElementById('tasks')
        tasks.appendChild(card)
    })
}


const initialiseEditPage = (todoId) => {
    let todos = getTodos()

    const indexFound = todos.findIndex(function(todo){
        if(todo.id === todoId ){
            return todo
        }
    })
    const todo = todos[indexFound]

    //edit title
    const title = document.getElementById('title-name')
    const titleText = document.createElement('h1')  
    titleText.textContent = `${todo.task}`
    
    //date created 
    const dateCreated = document.createElement('p')
    dateCreated.setAttribute('id','date-created')
    const dateCreatedTimestamp = new moment(todo.createdAt)
    dateCreated.textContent = `Date Created ${dateCreatedTimestamp.format('MMM DD, YYYY (HH:mm:ss)')}`

    //date updated 
    const lastUpdated = document.createElement('p')
    lastUpdated.setAttribute('id','date-updated')
    const lastUpdatedTimeStamp = new moment(todo.updatedAt)
    lastUpdated.textContent = `Last Updated ${lastUpdatedTimeStamp.fromNow()}`

    title.textContent=''
    title.appendChild(titleText)
    title.appendChild(dateCreated)
    title.appendChild(lastUpdated)
    //edit body 
    document.querySelector('#task-body').value = todo.body

}
export {generateTodoDOM, renderTodos, initialiseEditPage }