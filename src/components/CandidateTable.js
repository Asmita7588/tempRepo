import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './App.css'; 
import  useNavigate  from "react-router-dom";



const CandidateTable = () => {
  
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    axios.get("http://localhost:8080/api/candidates")
      .then(response => {
        setCandidates(response.data); // Set the fetched data
        console.log(response);
      })
      .catch(error => {
        console.error('There was an error fetching the candidate data!', error);
      });
  }, []);

  const openCandidateForm =() => {

navigate("/candidate");

  }

  return (
    <div className="container">
      {/* <h2>Candidate List</h2> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>
                <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-file-pdf" style={{ color: 'red' }}></i>
                </a>
              </td>
              <td>
                <a href={candidate.photoUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-image" style={{ color: 'green' }}></i>
                </a>
              </td>
              <td>
                <button className="update-btn">Update</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={openCandidateForm} className="add-btn">Add Candidate</button>
    </div>
  );
};

export default CandidateTable;
