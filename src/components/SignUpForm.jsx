import { useState } from "react";


export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        const error = []
       
        if (username.length < 8) {
            error.username = "username should be at least 8 characters long";
        }
        // Password validation
        if (password.length < 8) {
            error.password = "Password must be at least 8 characters long.";
        }

        if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            error.password = "Password must contain at least one special character.";
        }
        
        return error
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
       // Run validation
       const validationErrors = validateForm();
       if (Object.keys(validationErrors).length > 0) {
           setError(validationErrors);
           return;
       }

       setError([]);
       setSubmitting(true);
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",
                {
                    method: "POST",
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );

            const result = await response.json();
            if (result.token) {
                setToken(result.token); // Store the token
            } else {
                throw new Error("Failed to sign up, no token received");
            }
        } catch (error) {
            setError( error.message );
        }finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            {error.general && <p className="error">{error.general}</p>}
            {submitting && !error.general && <span className="success">Successfully Submitted</span>}
            
            <form onSubmit={handleSubmit}>
                <label>
                    Username :
                    <input placeholder="Username" name="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
                </label><br />
                {error.username && <p className="error">{error.username}</p>}
                <label>
                    Password :
                    <input placeholder="Password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </label><br />
                {error.password && <p className="error">{error.password}</p>}
                
                <input type="submit" value="Submit" disabled={submitting} />

            </form>
        </>
    );
}