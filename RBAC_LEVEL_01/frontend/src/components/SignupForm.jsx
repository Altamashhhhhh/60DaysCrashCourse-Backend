import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'viewall',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);


        try{
          const response = await   fetch("http://localhost:3001/user/register" , {
                method : "POST" , 
                headers : {
                    "Content-Type" : "application/json" , 
                }
                , body : JSON.stringify(formData)
            })
            if(response.ok){
                const data = await response.json()
                console.log('Success:', data);
            }else{
                console.error("Error",  response.statusText)
            }

        }catch(error){
            console.log("error : " , error)
        }
        // Here, you can handle the form submission, like sending the data to your server
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Signup Form</h2>

            <div style={{ marginBottom: '1em' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '.5em' }}>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '.5em' }}
                />
            </div>

            <div style={{ marginBottom: '1em' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '.5em' }}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '.5em' }}
                />
            </div>

            <div style={{ marginBottom: '1em' }}>
                <label htmlFor="role" style={{ display: 'block', marginBottom: '.5em' }}>Role:</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '.5em' }}
                >
                    <option value="viewall">viewall</option>
                    <option value="view">View</option>
                    <option value="creator">Creator</option>
                </select>
            </div>

            <div style={{ marginBottom: '1em' }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: '.5em' }}>Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '.5em' }}
                />
            </div>

            <button type="submit" style={{ padding: '.7em', backgroundColor: '#0066FF', color: 'white', border: 'none', cursor: 'pointer' }}>
                Signup
            </button>
        </form>
    );
};

export default SignupForm;
