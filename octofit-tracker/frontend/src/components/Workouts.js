import React, { useEffect, useState } from 'react';

function getApiUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
  return `${protocol}://${codespace}-8000.app.github.dev/api/workouts/`;
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(getApiUrl())
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-warning text-dark">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead className="table-warning">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Workout Name</th>
              <th scope="col">Type</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id}>
                <th scope="row">{idx + 1}</th>
                <td>{workout.name}</td>
                <td>{workout.type}</td>
                <td>{workout.duration}</td>
                <td>
                  <button className="btn btn-sm btn-outline-warning me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-warning mt-3 text-dark">Add Workout</button>
      </div>
    </div>
  );
}

export default Workouts;
