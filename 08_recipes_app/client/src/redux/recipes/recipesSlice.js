import { createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
    },
    reducers: {
        setRecipes(state, action) {  
            state.recipes = action.payload;
        },
        addRecipe(state, action) {
            const recipe = action.payload;
            state.recipes = [...state.recipes, recipe];
        },
        deleteRecipe(state, action) {
            const recipeId = action.payload;
            const newRecipes = state.recipes.filter((recipe) => recipe.id !== recipeId);
            state.recipes = newRecipes;
        },
        editRecipes(state,action) {
            const updatedRecipe = action.payload;
            const recipesIndex = state.recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
            state.recipes[recipesIndex] = updatedRecipe;
        }
    },
});

export const { setRecipes, addRecipe, deleteRecipe, editRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;