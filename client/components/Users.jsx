import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      if (err.response?.data) {
        setError(
          err.response.data.message || "Request failed"
        );
      } else {
        setError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  if (error) {
    return (
      <div className="error-box">
        <h3>Request Failed</h3>
        <p>{error}</p>
        <button onClick={fetchUsers}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;