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
    },
});

export const { setRecipes, addRecipe, deleteRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;