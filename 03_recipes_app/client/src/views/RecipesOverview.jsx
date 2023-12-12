import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axiosInstance from '../axios-instance.js';
import CustomCard from '../components/CustomCard.jsx';

const RecipesOverview = () => {
  const [recipes, setRecipes] = useState([]);
  
  const handleGetRecipes = async () => {
    const result = await axiosInstance.get('/recipes');
    // console.log(result);

    if (result.status === 200) {
       setRecipes(result.data);
    };
  };

  useEffect(() => {
    handleGetRecipes(); // eslint-disable-next-line
  }, []);
  // console.log(recipes);

  return (
    <div>
        <h1>Recipes Overview</h1>
        <Box display='flex' flexWrap='wrap' gap='2rem' marginTop='2rem'>
            {recipes.map((recipe) => {
                return (
                    <CustomCard 
                        key={recipe.name}
                        title={recipe.name} 
                        image={recipe.imageURL}
                    />
                )
            })}
        </Box>
    </div>
  );
};

export default RecipesOverview;