import moment from 'moment'
import { getFilters } from './filters'
import { getRecipes, removeIngredient, toggleIngredientAvailability, saveRecipes } from './recipes'

// Generate DOM Elements

const generateRecipesDOM = (recipe) => {
    const containerElement = document.createElement('div')
    const recipeElement = document.createElement('a')
    const textElement = document.createElement('p')
    const summaryElement = document.createElement('p')

    // Setup the recipe title text
    if (recipe.name.length > 0) {
        textElement.textContent = recipe.name
    } else {
        textElement.textContent = 'Unnamed Recipe'
    }
    textElement.classList.add('list-item__title')
    recipeElement.appendChild(textElement)
    
    // Setup the edit page link
    recipeElement.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeElement.classList.add('list-item')
    containerElement.appendChild(recipeElement)


    // Setup the ingredients summary message
    const available = recipe.ingredients.filter((ingredient) => ingredient.available === true)

    if (available.length === recipe.ingredients.length && recipe.ingredients.length) {
        summaryElement.textContent = 'You have all the ingredients.'
    } else if (available.length > 0 && available.length < recipe.ingredients.length) {
        summaryElement.textContent = 'You have some of the ingredients.'
    } else if (recipe.ingredients.length === 0) {
        summaryElement.textContent = 'There are no ingredients listed.'
    } else {
        summaryElement.textContent = 'You have none of the ingredients.'
    }
    summaryElement.classList.add('list-item__subtitle')
    recipeElement.appendChild(summaryElement)

    return containerElement
}

// Render recipes to the DOM
const renderRecipes = () => {
    const recipesElement = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    
    recipesElement.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            recipesElement.appendChild(generateRecipesDOM(recipe))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show!'
        emptyMessage.classList.add('empty-message')
        // UPDATE emptyMessage STYLING
        recipesElement.appendChild(emptyMessage)
    }
    
}

const recipes = getRecipes()

const generateIngredientsDOM = (ingredient, recipeId) => {
    const ingredientElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const checkbox = document.createElement('input')
    const nameElement = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.available
    containerElement.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleIngredientAvailability(ingredient.id)
        saveRecipes()
        renderIngredients()
    })

    // Setup the recipe title text
    if (ingredient.text.length > 0) {
        nameElement.textContent = ingredient.text
    } else {
        nameElement.textContent = 'Unnamed Ingredient'
    }
    containerElement.appendChild(nameElement)
    ingredientElement.classList.add('list-item-edit')
    containerElement.classList.add('list-item__container')
    ingredientElement.appendChild(containerElement)

    // Setup remove button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    ingredientElement.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(ingredient.id)
        renderIngredients()
    })

    
    return ingredientElement
}



const initializeEditPage = (recipeId) => {
    const nameElement = document.querySelector('#recipe-name')
    const detailsElement = document.querySelector('#recipe-details')
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })
    if (!recipe) {
        location.assign('/index.html')
    }

    nameElement.value = recipe.name
    detailsElement.value = recipe.details
    renderIngredients()
}

const renderIngredients = () => {
    const ingredientsElement = document.querySelector('#ingredients')
    const messageElement = document.createElement('p')
    messageElement.textContent = 'No ingredients to display'

    ingredientsElement.innerHTML = ''
    
    recipes.find((recipe) => {
        const recipeId = location.hash.substring(1)
        if (recipe.id === recipeId) {
            recipe.ingredients.forEach((ingredient) => {
                ingredientsElement.appendChild(generateIngredientsDOM(ingredient))
            })
        }
    })
}

export { renderRecipes, initializeEditPage, renderIngredients }