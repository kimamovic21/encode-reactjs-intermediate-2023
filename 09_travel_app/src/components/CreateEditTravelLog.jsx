import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CreateEditTravelLog = ({ open, handleClose, diary, setDiary }) => {
  const schema = yup.object({
    place: yup.string().required('Place is required').min(3, 'Place cannot be less than 3 characters long'),
    date: yup.date().required('Date is required'),
    duration: yup.number().integer().required('Duration is required'),
    description: yup.string().required('Description is required').min(10, 'Description cannot be less than 10 characters long ')
  }).required();

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      duration: 1,
    }
  });

  const handleModalClose = () => {
    reset({ place: '', date: '', duration: '', description: '' });
    handleClose();
  };

  const handleCreateEditTravelLog = (data) => {
    console.log(data);
    const newDiary = [...diary, data];
    setDiary(newDiary);
    localStorage.setItem('diary', JSON.stringify(newDiary));
    handleModalClose()
  };

  const textFieldStyle = { 
    margin: '10px',
    width: '60%'
  };

  console.log(errors);

  return (
    <section>
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent sx={{ display:'flex', flexDirection: 'column', gap:'10px'}}>
            <TextField 
              {...register('place')} 
              variant='outlined' 
              label='Travel Place'
              sx={textFieldStyle}
              error={errors?.place}
              helperText={errors?.place?.message}
            />
            <TextField 
              {...register('description')} 
              variant='outlined' 
              label='Travel Description'
              sx={textFieldStyle}
              error={errors?.description}
              helperText={errors?.description?.message}
            />
            <TextField 
              {...register('date')} 
              variant='outlined' 
              sx={textFieldStyle}
              error={errors?.date}
              helperText={errors?.date?.message}
              type='date'
            />
            <TextField 
              {...register('duration')} 
              variant='outlined' 
              label='Travel Duration'
              sx={textFieldStyle}
              error={errors?.duration}
              helperText={errors?.duration?.message}
              type='number'
            />
        </DialogContent>
        <DialogActions sx={{ display:'flex', justifyContent:'space-between', padding: '10px' }}>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSubmit(handleCreateEditTravelLog)} variant='contained' disabled={!isValid}>
            Create
          </Button>
        </DialogActions>
    </Dialog>
    </section>
  );
};

export default CreateEditTravelLog;

CreateEditTravelLog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};
