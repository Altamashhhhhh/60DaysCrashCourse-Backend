import React, { useEffect, useState } from "react";

const Users = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/user/users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setUser(data);
      })
      .catch((error) => {
        console.error(`Error while fetching data from server: ${error}`);
        setError(error.message); // Set error message in state
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/user/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === "Deleted Successfully") {
          console.log(data.message);
          // Update state with the filtered list
          setUser((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error(`Error while deleting the user: ${error}`);
        setError(`Error while deleting the user: ${error.message}`);
      });
  };

  return (
    <div>
      {error && <p>Error: {error}</p>} {/* Display error message if any */}
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
            <th>Functionalities</th>
          </tr>
        </thead>
        <tbody>
          {user.length === 0 ? (
            <tr>
              <td colSpan="6">No User available</td>
            </tr>
          ) : (
            user.map((data) => (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>{data.password}</td>
                <td>
                  <button onClick={() => handleDelete(data._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
