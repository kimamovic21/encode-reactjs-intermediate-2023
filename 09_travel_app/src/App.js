import { useState } from 'react';
import { Button } from '@mui/material';
import CreateEditTravelLog from './components/CreateEditTravelLog';

const App = () => {
  const [diary, setDiary] = useState([]);
  const [isCreateEditTravelLogModalOpen, setIsCreateEditTravelLogModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsCreateEditTravelLogModalOpen(false);
  };

  return (
    <div className='wrapper'>
      <h1 className='wrapper-header'>Travel Diary App</h1>
      <Button variant='contained' onClick={() => setIsCreateEditTravelLogModalOpen(true)}>
        Add Travel Log
      </Button>
      <CreateEditTravelLog 
        open={isCreateEditTravelLogModalOpen} 
        handleClose={handleModalClose}
        diary={diary}
        setDiary={setDiary}
      />
    </div>
  );
};

export default App;
