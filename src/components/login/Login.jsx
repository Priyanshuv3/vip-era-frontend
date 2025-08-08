'use client'
import { useState } from 'react';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '@/redux/reducers/commonModalSlice';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch()
  const handleLogin =(e)=>{
    const { name, value } = e.target;
    setCredentials((prev)=>({
      ...prev, [name]: value
    }))
    
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    if (credentials.email && credentials.password) {
      if(credentials.email === 'sangtiyaan@gmail.com' && credentials.password === 'sangtiyaan'){
        dispatch(setMessageModal({show:true,message:"Login Successful",type:"success"}))
      }
      else{
        dispatch(setMessageModal({show:true,message:"Invalid Email or Password",type:"error"}))
      }
    }
  }
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.heading}>Login</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id="email" onChange={handleLogin} placeholder="Enter your email" value={credentials.email}/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" onChange={handleLogin} placeholder="Enter your password" value={credentials.password}/>
        </div>

        <button type="submit" className={styles.loginButton}>Login</button>

        <p className={styles.registerText}>
          Don't have an account? <a>Register here</a>
        </p>
      </form>
    </div>
  );
}
