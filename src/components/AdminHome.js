import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import { SERVER_URL } from '../constants';

const AdminHome = () => {
  

  useEffect(() => {
    // Called once after initial render
    fetchStudents();
  }, []);

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  const fetchStudents = () => {
    fetch(`${SERVER_URL}/student`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setStudents(data);
        setMessage('');
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setMessage('Error fetching students.');
      });
  };

  const deleteStudent = (event) => {
    setMessage('');
    const row_id = event.target.parentNode.parentNode.rowIndex - 1;
    console.log("Delete Student "+row_id);
    const studentId = students[row_id].studentId;
    console.log("print out" + studentId);
    if (window.confirm('Are you sure you want to delete the student?')) {
      fetch(`${SERVER_URL}/student/${studentId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('Delete ok');
            setMessage('Student deleted.');
            fetchStudents();
          } else {
            console.error('Error deleting student:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error deleting student:', error);
        });
    }
  };

  // Edit student object

  
  // const headers = ['ID', 'name', 'email', 'Delete Student', 'Edit Student'];
  const headers = ['ID', 'name', 'email', 'status code', 'reason',' ', ' '];

  return (
    <div>
      <div style={{ margin: 'auto' }}>
        <h3>Student List</h3>
        <h4>{message}</h4>
        <table className="Center"> 
              <thead>
                <tr>
                  {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
              </thead>
              <tbody>
              {students.map((row,idx) => (
                      <tr key={idx}>
                        <td>{row.studentId}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.statusCode}</td>
                        <td>{row.status}</td>
                        <td><EditStudent data={students} onClose={fetchStudents} /></td>
                        <td><button id = "deleteStudent"  type="button" margin="auto" onClick={deleteStudent}>Delete</button></td>
                      </tr>
                    ))}
              </tbody>
            </table>
        <AddStudent onClose = {fetchStudents}/>
      </div>
    </div>
  );
};

export default AdminHome;
