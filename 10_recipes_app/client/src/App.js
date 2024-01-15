import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RecipesOverview from './views/RecipesOverview';
import RecipeDetails from './views/RecipeDetails';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<RecipesOverview/>}/>
          <Route path='/recipe/:id' element={<RecipeDetails />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;