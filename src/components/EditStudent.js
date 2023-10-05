import React, { useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants';

const EditStudent = (props) => {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({student_id:0, name:"", email:""}); // Initialize with an empty object
  
 
 
//   const handleClickOpen = (event) => {
//     const row_id = event.target.parentNode.parentNode.rowIndex - 1;
//     setStudent(props.data[row_id])
//     setOpen(true);
//   };

  const handleClickOpen = (event) => {
    const row_id = event.target.parentNode.parentNode.parentNode.rowIndex - 1;
    setStudent(props.data[row_id]);
    setOpen(true);
};

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  }


  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

//   const handleChange = (event) => {
//     setEditedStudent({ ...editedStudent, [event.target.name]: event.target.value });
//   };
//   const handleChange = (event) => {
//     setEditedStudent({ ...editedStudent, [event.target.name]: event.target.value });
//   }

  const updateStudent = () => {
    // Check if the editedStudent has a valid id property before making the PUT request.
   
      fetch(`${SERVER_URL}/student/${student.studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })
        .then((res) => {
          if (res.ok) {
            console.log('Student Updated');
          } else {
            console.error('Error: ' + res.status);
          }
        })
        .catch((err) => {
          console.error(err);
        });
  };

//   return (
//     <div>
//       <Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
//         Edit Student
//       </Button>
//       <Dialog open={open} >
//         <DialogTitle>Edit Student</DialogTitle>
//         <DialogContent style={{ paddingTop: 15 }}>
//           <TextField
//             autoFocus
//             fullWidth
//             label="name"
//             name="name"
//             value={editedStudent.name}
//             onChange={handleChange}
//           />
//           <br />
//           <TextField
//             fullWidth
//             label="email"
//             name="email"
//             value={editedStudent.email}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button color="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button id="Update" color="primary" onClick={updateStudent}>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );

return (
    <div>
    <button type="button" margin="auto" onClick={handleClickOpen}>Edit</button>
    <Dialog open={open} >
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent  style={{paddingTop: 20}} >
            <TextField fullWidth label="student id" name="studentId" value={student.studentId} InputProps={{readOnly: true, }}/>
            <TextField autoFocus fullWidth label="name" name="name" value={student.name} onChange={handleChange}  /> 
            <TextField fullWidth label="email" name="email" value={student.email} onChange={handleChange}  /> 
        </DialogContent>
        <DialogActions>
            <Button color="secondary" onClick={handleClose}>Close</Button>
            <Button color="primary" onClick={updateStudent}>update</Button>
        </DialogActions>
    </Dialog> 
    </div>                       
)
};

export default EditStudent;
