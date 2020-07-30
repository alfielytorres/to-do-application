import { sort } from "./todo"

const filters = {
    searchTerm:'',
    hideCompleted:false,
    sortBy:'byEdited'
}


const getFilters = () => filters

const setFilters = (updates) => {
    if(typeof updates.searchTerm === 'string'){
        filters.searchTerm = updates.searchTerm
    }

    if(typeof updates.sortBy==='string'){
        filters.sortBy=updates.sortBy
    }

    if(typeof updates.hideCompleted==='boolean'){
        filters.hideCompleted=!filters.hideCompleted
    }

}

export {getFilters,setFilters}