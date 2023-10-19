import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants.js';

const AddStudent = (props) => {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({ name: '', email: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose(); 
  };

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  }

  const addStudent = () => {
    fetch(`${SERVER_URL}/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Student Added');
          handleClose(); // Close the dialog after adding a student
        } else {
          console.error('Error: ' + res.status);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Button id="addstudent"variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>Add Student</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent style={{ paddingTop: 15 }}>
          <TextField id = "student_name" autoFocus fullWidth label="name" name="name" onChange={handleChange} />
          <br />
          <TextField id = "student_email" autoFocus fullWidth label="email" name="email" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Close</Button>
          <Button id="add" color="primary" onClick={addStudent}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddStudent;
