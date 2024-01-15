import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, List, ListItem, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const { recipes } = useSelector(state => state.recipes);
    const navigate = useNavigate();

    useEffect(() => {
        const recipeToPreview = recipes.find((recipe) => recipe.id === id);
        setRecipe(recipeToPreview); //eslint-disable-next-line
    }, [recipes]);

    return (
        <Box display="flex" justifyContent="space-between" flexDirection='column' alignItems="center" width="100%">
            <Box display='flex' alignItems='center'>
                <ArrowBackIcon 
                    sx={{ fontSize: '50px', marginRight: '20px', cursor:'pointer' }} 
                    onClick={() => navigate('/')}
                />
                <Typography variant="h3">Recipe details</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" flexDirection="column" width="80%" sx={{
                padding: 5,
                background: "#F5EADA",
                color: 'black'
            }}>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h4" color="black" marginBottom={2}>{recipe?.name}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" justifyContent="space-between"flexDirection="column">
                    <Typography variant="h5" color="black" fontWeight="400">Ingredients:</Typography>
                    {recipe?.ingredients?.map(((ingredient, index) => (
                        <Box key={index} display="flex" alignItems="center">
                            <Typography paddingLeft="10px" color="#282C34">{index + 1}. {ingredient?.name} - {ingredient?.quantity}</Typography>
                        </Box>
                    )))}
                    </Box>
                    <Box display="flex" alignItems="center">
                        <img src={recipe?.imageURL} alt="food" width="400px" height="400px" />
                    </Box>
                </Box>
                <Box>
                <Typography variant="h5" marginTop={5}>Steps:</Typography>
                  <List>
                      {recipe?.steps?.map((step, index) => (
                          <ListItem key={index}>{`${index + 1}. ${step}`}</ListItem>
                      ))}
                  </List>
                </Box>
            </Box>
        </Box>
    );
};
export default RecipeDetails;