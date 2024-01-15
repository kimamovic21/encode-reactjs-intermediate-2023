import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../redux/recipes/recipesSlice.js';
import axiosInstance from '../axios-instance.js';
import CustomCard from '../components/CustomCard.jsx';
import CreateEditRecipe from '../components/CreateEditRecipe.jsx';

const RecipesOverview = () => {
  const [isCreateEditRecipeModalOpen, setIsCreateEditRecipeModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  const { recipes } = useSelector((state) => state.recipes);  
  const dispatch = useDispatch();

  const handleGetRecipes = async () => {
    const result = await axiosInstance.get('/recipes');

    if (result.status === 200) {
      dispatch(setRecipes(result.data));
    };
  };

  useEffect(() => {
    handleGetRecipes();  // eslint-disable-next-line
  }, []);

  const handleModalClose = () => {
    setIsEditMode(false);
    setRecipeToEdit(null);
    setIsCreateEditRecipeModalOpen(false);
  };

  return (
    <>
      <Box sx={{ marginLeft: '140px'}}>
          <Box sx={{
            marginRight: '50px', 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems:'center', 
            flexWrap: 'wrap'
          }}>
            <Typography variant='h2'>Recipes Overview</Typography>
            <Button 
              variant='contained' 
              size='medium' 
              onClick={() => setIsCreateEditRecipeModalOpen(true)}
            >
              New Recipe
            </Button>
          </Box>

          <Box display='flex' flexWrap='wrap' gap='2rem' marginTop='2rem'>
            {recipes.map((recipe) => {
              return (
                <CustomCard 
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.name} 
                  image={recipe.imageURL}
                  handleEdit={() => {
                    setIsCreateEditRecipeModalOpen(true);
                    setIsEditMode(true);
                    setRecipeToEdit(recipe);
                  }}
                />
              )
            })}
          </Box>
      </Box>
      
      <CreateEditRecipe 
        open={isCreateEditRecipeModalOpen} 
        handleClose={handleModalClose}
        isEditMode={isEditMode}
        recipeToEdit={recipeToEdit}
      />
    </>
  );
};

export default RecipesOverview;