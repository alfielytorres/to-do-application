const todoId = location.hash.substring(1)

const todos = getSavedTodos()
//find to do
const findToDo = function(){
    const  indexFound = todos.findIndex(function(todo){
        if(todo.id === todoId ){
            return todo
        }
    })
    return todos[indexFound]
}



const setTitle = function(){
    const todo = findToDo() 
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


setTitle()

document.querySelector('#task-name').addEventListener('input', function(e){
    const todo = findToDo() 

    if(e.target.value!==""){
        todo.task = e.target.value
        todo.updatedAt = moment().valueOf()
        saveTodos(todos)
        setTitle()
    }
    
    

})

document.querySelector('#task-body').addEventListener('input', function(e){
    const todo = findToDo() 
    
    if(e.target.value!==""){
        todo.body= e.target.value
        
    }
    todo.updatedAt = moment().valueOf()
    saveTodos(todos)
    setTitle()
})


document.querySelector('#remove-button').addEventListener('click', function(){
    const todo = findToDo() 
    removeTodo(todo.id)
    saveTodos(todos)
    location.assign('index.html')
})





window.addEventListener('storage', function(e){
    const todo= findToDo()
    

    if(e.key=="todos"){
        const newTodos = JSON.parse(e.newValue)
        console.log(newTodos)
        

        const  indexFound = todos.findIndex(function(todo){
            if(todo.id === todoId ){
                return todo
            }
        })




        document.querySelector('#task-body').value = newTodos[indexFound].body
        document.querySelector('#task-name').value = newTodos[indexFound].task

        

        


    }
    
  
})