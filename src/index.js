import { setFilters } from './filters'
import { renderRecipes } from './views'
import { addRecipe } from './recipes'

renderRecipes()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

document.querySelector('#create-recipe').addEventListener('click', () => {
    const recipeId = addRecipe()
    location.assign(`/edit.html#${recipeId}`)
})

// document.querySelector('#button').addEventListener('click', (e) => {
//     const recipeId = addRecipe()
//     location.assign(`/edit.html#${recipeId}`)
// })