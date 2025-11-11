import React, { useEffect, useState } from 'react';

function getApiUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
  return `${protocol}://${codespace}-8000.app.github.dev/api/activities/`;
}

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(getApiUrl())
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

    return (
      <div className="card shadow mb-4">
        <div className="card-header bg-info text-white">
          <h2 className="h4 mb-0">Activities</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-info">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{activity.user || activity.username || ''}</td>
                  <td>{activity.type || activity.activity_type || ''}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.date}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-info me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-info mt-3 text-white">Add Activity</button>
        </div>
      </div>
    );
}

export default Activities;
