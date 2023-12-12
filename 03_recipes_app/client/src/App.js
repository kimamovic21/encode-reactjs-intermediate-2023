import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipesOverview from './views/RecipesOverview';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<RecipesOverview/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;