import React, { useEffect, useState } from 'react';

function getApiUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
  return `${protocol}://${codespace}-8000.app.github.dev/api/users/`;
}

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(getApiUrl())
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h2 className="h4 mb-0">Users</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Team</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <th scope="row">{idx + 1}</th>
                <td>{user.username || user.name}</td>
                <td><a href={`mailto:${user.email}`} className="link-primary">{user.email}</a></td>
                <td>{user.team}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-3">Add User</button>
      </div>
    </div>
  );
}

export default Users;
