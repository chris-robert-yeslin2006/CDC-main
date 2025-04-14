'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from "sonner";
import LoginBackground from './LoginBackground';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          password
        })
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      const token = data.access_token;
      console.log(token);
  
      // Save the token in sessionStorage
      sessionStorage.setItem('accessToken', token);
      
      toast.success("Login successful!");
      
      // Redirect to Dashboard using Next.js router
      router.push('/Dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h2 className="login-title">Super Admin Login</h2>
        </div>
        
        <div className="login-card">
          <div className="login-card-header">
            <h3 className="login-card-title">Welcome back Lead</h3>
            <p className="login-card-description">
              Enter your account details to sign in.
            </p>
          </div>
          <div className="login-card-content">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <input 
                  type="email" 
                  className="login-input"
                  placeholder="Email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="login-form-group">
                <input 
                  type="password" 
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <LoginBackground />
    </div>
  );
};

export default Login;
