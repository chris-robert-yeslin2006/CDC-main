'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
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
  
      // Save the token in sessionStorage
      sessionStorage.setItem('accessToken', token);
  
      // Redirect to Dashboard
      router.push('/Dashboard');
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L20 20M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg> */}
            <span>Super Admin Login</span>
          </div>
        </div>
        
        <div className={styles.loginForm}>
          <h1>Welcome back Lead</h1>
          <p>Enter your account details to sign in.</p>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder="Email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className={styles.signInButton}>Sign in</button>
          </form>
        </div>
      </div>
      
      <div className={styles.imageSection}>
        {/* This is the decorative side image */}
      </div>
    </div>
  );
}