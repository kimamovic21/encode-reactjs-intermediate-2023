import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const params = useParams();  console.log(params);
  const { id } = params;  console.log(id);

  return (
    <div>
        <h1>Recipe Details</h1>
    </div>
  );
};

export default RecipeDetails;