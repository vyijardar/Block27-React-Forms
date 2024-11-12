import { useState } from "react";

export default function Authenticate({ token, setUsername, username }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    async function handleClick() {

        try {
            if (!token) {
                setError("No token provided. Please log in or sign up to get a valid token.");
                return;
            }
    
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                },
            }
            );
            const result = await response.json();
            if (result.data && result.data.username) {
                setUsername(result.data.username); // Assuming `result.data.username` is where username is stored
            }

            setSuccessMessage(result.message);
            
            if (!response.ok) {
                throw new Error("Authentication failed. Please check the token.");
            }
        } catch (error) {
            setError(error.message);
        }

    }
    return (
        <>
            <h2>Authenticate</h2>
            {successMessage && <p className="success">{successMessage}</p> }
            {error && <p className="error">{error}</p>}
            <h3>{username}</h3>
            {
                <button onClick={handleClick}> Authenticate Token </button>
            }
        </>
    );
}