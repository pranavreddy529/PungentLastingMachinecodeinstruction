import React, { useState, useEffect } from 'react';
import './App.css';
import jobsData from './data.json';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setJobs(jobsData);
    setFilteredJobs(jobsData);
  }, []);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => selectedCategories.includes(job.category)));
    }
  }, [jobs, selectedCategories]);

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Job Listings</h1>
      </nav>
      <div className="content">
        <header>
          <div className="filter">
            <h3>Filter by Category:</h3>
            <div className="categories">
              {Array.from(new Set(jobs.map((job) => job.category))).map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </header>
        <main>
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>
                <strong>Category:</strong> {job.category}
              </p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;