
import React, { useEffect, useState } from 'react';
import CandidateList from './components/CandidateTable';
import AddCandidate from './components/AddCandidate';
import axios from 'axios';
import './App.css';  // Include the styles

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // To toggle form visibility

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const createCandidate = async (candidateData) => {
    try {
      const formData = new FormData();
      formData.append('name', candidateData.name);
      formData.append('email', candidateData.email);
      formData.append('resume', candidateData.resume);
      formData.append('photo', candidateData.photo);

      const response = await axios.post('http://localhost:8080/candidate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Candidate added successfully!');
      setShowAddForm(false); // Close form on successful add
      fetchCandidates(); // Refresh list
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate!');
    }
  };

  const deleteCandidate = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`http://localhost:8080/${id}`);
        alert('Candidate deleted successfully');
        fetchCandidates();
      } catch (error) {
        alert('Failed to delete candidate');
        console.error('Error deleting candidate:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Candidate List</h2>
      <div className="candidate-section">
        <CandidateList candidates={candidates} deleteCandidate={deleteCandidate} />
        <div className="candidate-form-section">
          {showAddForm && <AddCandidate createCandidate={createCandidate} />}
          <button className="add-candidate-btn" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add Candidate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
