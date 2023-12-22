import React from 'react';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ title, image, id }) => {
  const navigate = useNavigate();

  const handleNavigateToDetailsPage = () => {
    navigate(`/recipe/${id}`, { state: { title: title }} );
  };

  return (
    <Card 
      sx={{ width: 300, margin: 2, ':hover': { cursor:'pointer', transform: 'scale(1.05)', transition: 'all 0.2s'} }} 
      onClick={handleNavigateToDetailsPage}
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
    </Card>
  );
};

export default CustomCard;