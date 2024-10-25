// src/App.js

import React from 'react';

const AdminDashboard = () => {
  // Sample data
  const students = [
    { id: 1, name: 'Alice Johnson', assessment: 'Math Exam', score: 85.5, approved: true },
    { id: 2, name: 'Bob Smith', assessment: 'Science Project', score: 78.0, approved: false },
    { id: 3, name: 'Charlie Brown', assessment: 'History Quiz', score: 92.0, approved: true },
  ];

  return (
    <div>
      <h1>Student Assessments</h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Assessment Name</th>
            <th>Score</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.assessment}</td>
              <td>{student.score}</td>
              <td>{student.approved ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;