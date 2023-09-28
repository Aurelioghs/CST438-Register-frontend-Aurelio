// Modify the AdminHome.js  fetch and display a list of all students using html table.  See ShowSchedule.js  as example and the buttons for Adding and Dropping a course.

import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import {SERVER_URL} from '../constants';

const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Called once after initial render
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    // TODO: Complete this method to fetch students and display the list of students
    fetch(`${SERVER_URL}/student`)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setMessage('');
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setMessage('Error fetching students.');
      });
  };

  // const row_id = event.target.parentNode.parentNode.rowIndex - 1;
  //       console.log("deleteStudent "+row_id);
  //       const studentId = students[row_id].studentId;
  //       console.log("student_id "+studentId);

  // Delete student
  const deleteStudent = (event) => {
    setMessage('');
   const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        console.log("deleteStudent "+row_id);
        const student_id = students[row_id].student_id;
        console.log("student_id "+student_id);
    
    if (window.confirm('Are you sure you want to delete the student?')) {
        fetch(`${SERVER_URL}/student/${student_id}`,
        {
            method: 'DELETE',
        }
        )
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

  // Edit Student here
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
            {students.map((student, idx) => (
              <tr key={idx}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={(event) => deleteStudent(event)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddStudent/>
      </div>
    </div>
  );
};

export default AdminHome;
