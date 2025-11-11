import React, { useEffect, useState } from 'react';

function getApiUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
  return `${protocol}://${codespace}-8000.app.github.dev/api/leaderboard/`;
}

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const url = getApiUrl();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setLeaders(results);
      })
      .catch((err) => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-secondary text-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">User</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={leader.id}>
                <th scope="row">{idx + 1}</th>
                <td>{leader.username || leader.user || ''}</td>
                <td>{leader.score || leader.points || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
