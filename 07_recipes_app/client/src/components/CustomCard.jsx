import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../redux/recipes/recipesSlice';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
import axiosInstance from '../axios-instance';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CustomCard = ({ title, image, id, handleEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateToDetailsPage = () => {
    navigate(`/recipe/${id}`, { state: { title: title }} );
  };

  const handleDelete = async () => {
    const result = await axiosInstance.delete(`/recipes/${id}`);
    if (result?.status === 200) {
      dispatch(deleteRecipe(id));
    };
  };

  return (
    <Card sx={{ 
      width: 300, 
      margin: 2, 
      ':hover': { 
        cursor:'pointer', 
        transform: 'scale(1.05)', 
        transition: 'all 0.2s'
      } 
    }} 
    > 
        <CardMedia 
            component='img' 
            height='300' 
            width='400'
            image={image} 
            alt='My pic' 
        />
        <CardContent>
            <CardHeader title={title} />
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button onClick={handleNavigateToDetailsPage}>
              <VisibilityIcon/>
          </Button>
          <Button onClick={handleEdit}>
              <EditIcon/>
          </Button>
          <Button sx={{ color: 'red' }} onClick={handleDelete}>
              <DeleteIcon/>
          </Button>
        </CardActions>
    </Card>
  );
};

export default CustomCard;