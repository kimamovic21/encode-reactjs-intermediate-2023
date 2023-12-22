import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);

  const params = useParams();  // console.log(params);
  const { id } = params;  // console.log(id);
  const { recipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (id) {
      const recipeToPreview = recipes.find((recipe) => recipe.id === id);
      console.log(recipeToPreview);
      setRecipe(recipeToPreview);
    }
    // eslint-disable-next-line
  }, [recipes]); 

  return (
    <Box margin='0 auto' minWidth='400px' maxWidth='500px' boxShadow='1px 1px 1px 1px' padding='5px'>
        <Typography variant='h3'>Recipe Details</Typography>
        <Box>
          <img src={recipe?.imageURL} alt={recipe?.name} height='200px' width='250px' />
        </Box>
        <Box>
          <Box display='flex' justifyContent='space-around'>
            <Typography variant='h6'>Name: </Typography>
            <Typography>{recipe?.name}</Typography>
          </Box>

          <Typography>Ingredients:</Typography>
          <Box>
             {recipe?.ingredients?.map((ingredient) => (
              <Box key={ingredient.name}>
                  <Typography>{ingredient?.name} - {ingredient?.quantity}</Typography>
              </Box>
             ))}
          </Box>

          <Typography>Steps:</Typography>
          <Box marginLeft='20px'>
            <ol>
              {recipe?.steps?.map((step) => (
                  <li key={step}>{step}</li>
              ))}
            </ol>
          </Box>
        </Box>
    </Box>
  );
};

export default RecipeDetails;