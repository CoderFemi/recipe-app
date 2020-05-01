import {v4 as uuid} from 'uuid'
import moment from 'moment'

let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        throw new Error('Unable to load recipes')
    }
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Expose recipes from Module
const getRecipes = () => recipes

const addRecipe = () => {
    const recipeId = uuid()
    recipes.push({
        id: recipeId,
        name: '',
        details: '',
        ingredients: [],
        createdAt: moment().valueOf(),
        updatedAt: null
    })
    saveRecipes()
    return recipeId
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    } 
    location.assign('/index.html')
}

const addDetails = (id, text) => {
    recipes.find((recipe) => {
        if (recipe.id === id) {
            recipe.details = text
        }
    })
    saveRecipes()
}

const addIngredient = (id, text) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (recipe) {
        recipe.ingredients.push({
            id: uuid(),
            text,
            available: false
        })
        recipe.updatedAt = moment().valueOf()
        saveRecipes()
    }
}

const removeIngredient = (id) => {
    recipes.forEach((recipe) => {
        
        recipe.ingredients = recipe.ingredients.filter((ingredient) => ingredient.id !== id)
    })
    saveRecipes()
}

const updateRecipe = (recipeId, update) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
        if (!recipe) {
           return
        }

        if (typeof update.name === 'string') {
            recipe.name = update.name
            recipe.updatedAt = moment().valueOf()
        }

        if (typeof update.details === 'string') {
            recipe.details = update.details
            recipe.updatedAt = moment().valueOf()
        }
    saveRecipes()
}

const toggleIngredientAvailability = (id) => {
    recipes.forEach((recipe) => {
        recipe.ingredients.find((ingredient) => {
            if (ingredient.id === id) {
                ingredient.available = !ingredient.available
            }
        })
    })
}

recipes = loadRecipes()

export { getRecipes, saveRecipes, addRecipe, removeRecipe, addDetails, addIngredient, removeIngredient, updateRecipe, toggleIngredientAvailability }