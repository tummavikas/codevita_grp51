import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [approvalStatus, setApprovalStatus] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchApprovalStatus = async () => {
      try {
        const response = await axios.get('/api/assessments'); // Replace with your MongoDB API endpoint
        setApprovalStatus(response.data);
      } catch (error) {
        console.error('Error fetching approval status:', error);
      }
    };

    fetchApprovalStatus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.elements['assignment-title'].value;

    if (!title || !file) {
      setErrorMessage('Please fill in all fields correctly.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);
      const response = await axios.post('/api/assessments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update approval status after successful upload
      setApprovalStatus([
        ...approvalStatus,
        {
          _id: response.data._id,
          title: response.data.title,
          status: 'Pending', // Default status to Pending
        },
      ]);
      setFile(null); // Clear the file input after successful upload
    } catch (error) {
      console.error('Error uploading assessment:', error);
    }
  };

  const handleUpdateStatus = async (assessmentId, newStatus) => {
    try {
      await axios.put(`/api/assessments/${assessmentId}`, { status: newStatus });

      // Update the approval status in the state
      setApprovalStatus(
        approvalStatus.map((assessment) =>
          assessment._id === assessmentId ? { ...assessment, status: newStatus } : assessment
        )
      );
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  return (
    <div className="student-dashboard">
      <nav className="navbar">
        <h2>Student Dashboard</h2>
        <div className="profile-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEF1VVado8oDyN_74yeH3UjmgBExb4YwWpC8YQ4FkGZDbvuxRxu2NzZsMmOsTcss-Uig&usqp=CAU"
            alt="Profile Picture"
          />
          <div className="profile-details">
            <span>John Doe</span><br></br>
            <span>johndoe@gmail.com</span><br></br>
            <span>points</span>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="upload-container">
          <h2>Upload Assessment</h2>
          <form id="uploadForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="assignment-title">
                <b>Assignment Title</b>
              </label>
              <input
                type="text"
                id="assignment-title"
                name="title"
                placeholder="Enter assignment title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="file">
                <b>Upload File</b>
              </label>
              <input type="file" id="file" name="file" accept=".pdf,.doc,.docx,.ppt,.pptx" required onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div className="approval-status">
              <strong>Approval Status:</strong>
              {approvalStatus.map((assessment) => (
                <div key={assessment._id} className="status-item">
                  {assessment.title} - <span className={`status-${assessment.status.toLowerCase()}`}>{assessment.status}</span>
                  <button onClick={() => handleUpdateStatus(assessment._id, assessment.status === 'Pending' ? 'Approved' : 'Pending')}>
                    {assessment.status === 'Pending' ? 'Approve' : 'Reject'}
                  </button>
                </div>
              ))}
            </div>

            <button type="submit">Submit Assessment</button>
            {errorMessage && <div className="message" id="error-message">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;