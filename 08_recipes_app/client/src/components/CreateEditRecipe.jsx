import { useEffect, useState } from 'react';
import { BASE_INGREDIENT } from '../constants';
import { Alert, MenuItem, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, Snackbar, TextField } from '@mui/material';
import { generateUUID } from '../helpers';
import axiosInstance from '../axios-instance';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, editRecipes } from '../redux/recipes/recipesSlice';

const CreateEditRecipe = ({ open, handleClose, isEditMode, recipeToEdit }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([{ ...BASE_INGREDIENT }]);
    const [steps, setSteps] = useState(['']);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEditMode) {
            setName(recipeToEdit?.name);
            setIngredients(recipeToEdit?.ingredients);
            setSteps(recipeToEdit?.steps)
        }
    }, [isEditMode, recipeToEdit]);

    const textFieldWidth = {
        width: '60%',
        marginTop: '20px'
    };
    
    const handleIngredientChange = (fieldToChange, index, value) => {
        const ingredientsCopy = [...ingredients];  
        // const ingredientsCopy = JSON.parse(JSON.stringify(ingredients));  // deep clone/copy
        ingredientsCopy[index][fieldToChange] = value;
        setIngredients(ingredientsCopy);
    };

    const handleAddIngredient = () => {
        setIngredients((prevState) => [...prevState, { BASE_INGREDIENT }]);
    };

    const handleStepChange = (index, value) => {
        const stepsCopy = [...steps];
        stepsCopy[index] = value;
        setSteps(stepsCopy);
    };

    const handleModalClose = () => {
        handleClose();
        setName('');
        setIngredients([{ ...BASE_INGREDIENT }])
        setSteps(['']);
    };

    const handleCreateRecipe = async () => {
        try {
            if (isEditMode) {
                const recipe = {
                    ...recipeToEdit,
                    name,
                    ingredients,
                    steps,
                    imageURL: recipeToEdit?.imageURL
                }
                const result = await axiosInstance.put(`/recipes/${recipeToEdit.id}`, recipe);
                if (result?.status === 200) {
                    dispatch(editRecipes(result.data));
                    handleModalClose();
                    setMessage('Successfully edited');
                    setShowSnackbar(true);
                }
            } 
            else {
                const recipe = {
                id: generateUUID(),
                name: name,
                ingredients: ingredients,
                steps: steps,
                imageURL: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/8/23/0/FNM_100116-Classic-Crust_s4x3.jpg.rend.hgtvcom.616.462.suffix/1480972867043.jpeg',
                };
                const result = await axiosInstance.post('/recipes', recipe);
                if (result?.status === 201) {
                    dispatch(addRecipe(result.data));
                    handleModalClose();
                    setMessage('Successfully Created');
                    setShowSnackbar(true);
                };
            }
        }
        catch(error) {
            console.error(error);
        }
    };
    
    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
        setMessage('');
    };

    return (
        <>
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Create recipe</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    variant="outlined"
                    sx={textFieldWidth}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Box sx={{
                    borderTop: '1px solid gray',
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {ingredients?.map((ingredient, index) => {
                        return (
                            <Box key={index}>
                                <TextField
                                    label="Ingredient name"
                                    variant="outlined"
                                    sx={textFieldWidth}
                                    value={ingredient.name}
                                    onChange={(e) => handleIngredientChange('name', index, e.target.value)}
                                />
                                <TextField
                                    label="Quantity"
                                    variant="outlined"
                                    sx={textFieldWidth}
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange('quantity', index, e.target.value)}
                                />
                                <FormControl sx={textFieldWidth}>
                                    <InputLabel id="select-type-label">Type</InputLabel>
                                    <Select
                                        labelId="select-type-label"
                                        value={ingredient.type}
                                        label="Type"
                                        onChange={(e) => handleIngredientChange('type', index, e.target.value)}
                                    >
                                        <MenuItem value="meat">Meat</MenuItem>
                                        <MenuItem value="drinks">Drinks</MenuItem>
                                        <MenuItem value="baking">Baking</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        )
                    })}
                    <Button variant="outlined" sx={{ marginTop: '20px', alignSelf: 'center' }} onClick={handleAddIngredient}>
                        + Add ingredient
                    </Button>
                </Box>
                <Box sx={{
                    borderTop: '1px solid gray',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    {steps?.map((step, index) => {
                        return (
                            <TextField
                                key={index}
                                label={`Step ${index + 1}`}
                                variant="outlined"
                                sx={textFieldWidth}
                                value={step}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                            />
                        )
                    })}
                     <Button 
                        variant="outlined" 
                        sx={{ marginTop: '20px', alignSelf: 'center' }} 
                        onClick={() => setSteps((prevState) => [...prevState, ''])}
                    >
                        + Add Step
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px' }}>
                <Button variant='outlined' onClick={handleModalClose}>
                    Cancel
                </Button>
                <Button variant='contained' onClick={handleCreateRecipe}>
                    {`${isEditMode ? 'Edit' : 'Create'} Recipe`} 
                </Button>
            </DialogActions>
        </Dialog>
         <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            open={showSnackbar}
            onClose={handleCloseSnackbar}
            message={message}
            key={'top' + 'right' + message}
            autoHideDuration={5000}>
                <Alert severity='success' elevation={6} variant='filled'>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateEditRecipe;