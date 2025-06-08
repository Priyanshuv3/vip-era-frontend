import styles from './login.module.css';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <h2 className={styles.heading}>Login</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className={styles.loginButton}>Login</button>

        <p className={styles.registerText}>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
}
