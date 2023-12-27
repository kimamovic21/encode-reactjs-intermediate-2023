import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { BASE_INGREDIENT } from '../constants';

const CreateEditRecipe = ({ open, handleClose }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([{...BASE_INGREDIENT}]);
    console.log(ingredients);

    const textFieldWidth = {
        width: '60%',
        marginTop: '20px'
    };
    
    const handleIngredientChange = (fieldToChange, index, value) => {
        const ingredientsCopy = [...ingredients];
        ingredientsCopy[index][fieldToChange] = value;
        setIngredients(ingredientsCopy);
    };

    return (
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
                    {ingredients.map((ingredient, index) => (
                        <Box key={ingredient.name}>
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
                                    value={ingredient.type}
                                    label="Type"
                                    labelId="select-type-label"
                                    onChange={(e) => handleIngredientChange('type', index, e.target.value)}
                                >
                                    <MenuItem value="meat">Meat</MenuItem>
                                    <MenuItem value="drinks">Drinks</MenuItem>
                                    <MenuItem value="baking">Baking</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    ))}
                    <Button variant="outlined" sx={{
                        marginTop: '20px',
                        alignSelf: 'center'
                    }}>+ Add ingredient</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
};

export default CreateEditRecipe;