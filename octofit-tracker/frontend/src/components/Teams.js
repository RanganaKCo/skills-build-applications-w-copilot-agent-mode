import React, { useEffect, useState } from 'react';

function getApiUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
  return `${protocol}://${codespace}-8000.app.github.dev/api/teams/`;
}

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(getApiUrl())
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-success text-white">
        <h2 className="h4 mb-0">Teams</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead className="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team Name</th>
              <th scope="col">Members</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id}>
                <th scope="row">{idx + 1}</th>
                <td>{team.name}</td>
                <td>{team.members || (team.users ? team.users.length : '')}</td>
                <td>
                  <button className="btn btn-sm btn-outline-success me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success mt-3">Add Team</button>
      </div>
    </div>
  );
}

export default Teams;
