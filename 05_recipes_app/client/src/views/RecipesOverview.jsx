import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../redux/recipes/recipesSlice.js';
import axiosInstance from '../axios-instance.js';
import CustomCard from '../components/CustomCard.jsx';

const RecipesOverview = () => {
  const dispatch = useDispatch();
  // const recipes = useSelector((state) => state.recipes.recipes);
  const { recipes } = useSelector((state) => state.recipes);

  const handleGetRecipes = async () => {
    const result = await axiosInstance.get('/recipes');

    if (result.status === 200) {
      dispatch(setRecipes(result.data));
    };
  };

  useEffect(() => {
    handleGetRecipes();  // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ marginLeft: '140px'}}>
        <Box sx={{marginRight: '50px', display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
          <Typography variant='h2'>Recipes Overview</Typography>
          <Button variant='contained' size='medium'>New Recipe</Button>
        </Box>
        <Box display='flex' flexWrap='wrap' gap='2rem' marginTop='2rem'>
            {recipes.map((recipe) => {
                return (
                    <CustomCard 
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.name} 
                        image={recipe.imageURL}
                    />
                )
            })}
        </Box>
    </Box>
  );
};

export default RecipesOverview;