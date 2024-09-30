import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates", error);
    }
  };

  return (
    <div>
      <h2>Candidate List</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
