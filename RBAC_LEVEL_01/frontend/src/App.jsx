
import React, { useState } from "react";
import "./App.css"
import BookView from "./components/BookView";
import Users from "./components/Users";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { createBrowserRouter , RouterProvider , Routes } from "react-router-dom" 
import Navbar from "./components/Navbar";
import Home from "./components/Home";



function App() {
  const router = createBrowserRouter([
    {path : "/" , element : <Home />},
    {path : "/user" , element : <Users /> }
  ])

  // const [isloggedIn , setIsLoggedIn] = useState(false)

  // function handleLogin(){
  //   setIsLoggedIn(true)
  // }
  
  return (
    <>
   
    <RouterProvider router={router} />

    {/* <Users/> */}
    {/* <SignupForm /> */}
    {/* <LoginForm /> */}
    {/* {!isloggedIn ? <LoginForm onLogin={handleLogin} /> : <Users />} */}
    </>
  );
}

export default App;
