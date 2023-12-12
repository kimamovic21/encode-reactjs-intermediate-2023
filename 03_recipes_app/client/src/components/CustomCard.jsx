import React from 'react';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';

const CustomCard = ({ title, image }) => {
  return (
    <Card sx={{ width: 300 }}> 
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