import styles from './footer.module.css';

export default function Footer() {
  return (
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <h4>Brahmastra</h4>
            <p>Fast & privacy-first online utilities.</p>
          </div>

          <div>
            <h4>Categories</h4>
            <a>Image</a>
            <a>PDF</a>
            <a>Video</a>
            <a>Music</a>
          </div>

          <div>
            <h4>About</h4>
            <a href="#portfolio">Creator</a>
            <a>Privacy</a>
            <a>Terms</a>
          </div>

          <div>
            <h4>Connect</h4>
            <a href="https://github.com/priyanshuv3">GitHub</a>
            <a href="https://linkedin.com/in/priyanshuv3">LinkedIn</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          © 2025 Brahmastra Tools · Built by Priyanshu Verma
        </div>
      </footer>
  );
}
