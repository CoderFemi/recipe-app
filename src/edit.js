import { removeRecipe, addIngredient, updateRecipe } from './recipes'
import { initializeEditPage, renderIngredients } from './views'

const nameElement = document.querySelector('#recipe-name')
const detailsElement = document.querySelector('#recipe-details')
const removeElement = document.querySelector('#remove-recipe')
const addIngredientElement = document.querySelector('#add-ingredient')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

addIngredientElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.addIngredient.value.trim()

    if (text.length > 0) {
        addIngredient(recipeId, text)
        renderIngredients()
        e.target.elements.addIngredient.value = ''
    }
})

nameElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        name: e.target.value
    })
})

detailsElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        details: e.target.value
    })
})

removeElement.addEventListener('click', (e) => removeRecipe(recipeId))