import {createTodo} from './todo'
import {setFilters} from './filters'
import {renderTodos} from  './views'

renderTodos()

// Create 
document.querySelector('#add-form').addEventListener('submit', function(e){
    e.preventDefault() //allows us to handle the form submission
    const title = e.target.elements.task.value
    const id = createTodo(title)
    location.assign(`/edit_page.html#${id}`)
})

// delete
document.querySelector('#reset').addEventListener('click', function(){
    document.querySelectorAll('.task-item').forEach(function(item){
        todos.pop()
        item.remove()
    })  
    localStorage.clear()
    renderTodos()
})

// search
document.querySelector('#search').addEventListener('input', function(input){
    setFilters({
        searchTerm: input.target.value
    })
    renderTodos()
})



document.querySelector('#filter-by').addEventListener('change', function (e) {
    setFilters({
        sortBy: e.target.value
    })
    renderTodos()

})


// hide
document.querySelector('#hide-completed').addEventListener('change', function(e){
    setFilters({
        hideCompleted:e.target.checked
    })
    renderTodos()
})

window.addEventListener('storage', function(e){
    if(e.key==="todos"){
        renderTodos()
    } 
})
