import React, { useState } from "react";

const LoginForm = ({onLogin}) => {
    const [formData , setFormData] = useState({
        email : "" ,
        password : ""
    })

    function handleChange(e){
        const {name , value } = e.target; 

        setFormData({
            ...formData , 
            [name] : value
        })

    }
  const  handleSubmit =async  (e) =>{
    e.preventDefault();
    console.log(formData)

    
    try{
        const response = await fetch("http://localhost:3001/user/login" , {
            method : "POST" ,
            headers : {
                "Content-Type" : "application/json"
            } , 
            body : JSON.stringify(formData)
        })

        if(response.ok){
            const data = await response.json() ; 
            console.log("Success" , data)
            localStorage.setItem("token" , data.token )
            onLogin();
        }else{
            console.error("error" , response.statusText)
        }

    }
    catch(error){
        console.log("error :" , error)
    }

  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2>LOGIN FORM</h2>

        <div style={{ marginBottom: "1em" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: ".5em" }}
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: ".5em" }}
          />
        </div>

        <div style={{ marginBottom: "1em" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: ".5em" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: ".5em" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: ".7em",
            backgroundColor: "#0066FF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
