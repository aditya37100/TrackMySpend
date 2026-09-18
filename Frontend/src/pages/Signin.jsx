import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";

export default function Signin(){
     const [showSplash, setShowSplash] = useState(false);
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const handleSignIn = async (email, password) => {
        setLoading(true);
        setError("");
        
        try {
            const response = await fetch('https://trackmyspendapi-3.onrender.com/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', email);
                setShowSplash(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } else {
                // Handle different error cases
                if (response.status === 404) {
                    setError(data.message || 'User not found. Please sign up first.');
                } else if (response.status === 403) {
                    setError(data.message || 'Invalid credentials.');
                } else {
                    setError(data.message || 'Sign-in failed');
                }
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
     }

     if(showSplash){
        return <Splash/>
     }

    return (
        <div className="flex min-h-screen justify-center items-center bg-[#e8e8e8]">
            <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
                <h1 className="pb-6 text-4xl text-center">Sign-in</h1>
                <div className="h-0.5 bg-[#e8e8e8] w-full mb-4"></div>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <Input getstarted={handleSignIn} loading={loading}/>
            </div>
        </div>
    )
}