import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const BookView = () => {
  const token = localStorage.getItem("token")
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetch(`http://localhost:3001/book/allbooks` , {
      method : "GET" , 
      headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setBook(data);
      })
      .catch((error) => {
        console.error(`Error while fetching data from server: ${error}`);
        setError(error.message); // Set error message in state
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/book/delete/${id}`, {
      method: 'DELETE',
      headers : {
        "Authorization" : `Bearer ${token}` , 
        "Content-Type" : "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === "Book Deleted Successfully") {
          setBook((prevBooks) => prevBooks.filter((book) => book._id !== id));
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => 
        console.error(`Error while deleting the book: ${error}`));
  };

  return (
    <div>
      {/* <Navbar /> */}
      {error && <p>Error: {error}</p>} {"Error While Fetching The data"}
      <table border={1}>
        <thead>
          <tr>
            <th>USER ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {book.length === 0 ? (
            <tr>
              <td colSpan="6">No books available</td>
            </tr>
          ) : (
            book.map((data) => (
              <tr key={data._id}>
                <td>{data.userId}</td>
                <td>{data._id}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>
                  <button onClick={() => handleDelete(data._id)}>DELETE</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookView;
