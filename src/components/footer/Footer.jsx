import styles from "./footer.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaImage,
  FaFilePdf,
  FaVideo,
  FaMusic,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Brand */}
        <div className={styles.brand}>
          <h4>Brahmastra</h4>
          <p>Fast & privacy-first online utilities.</p>
        </div>

        {/* Categories */}
        <div className={styles.footerBlock}>
          <h4>Categories</h4>
          <a href="/tools/image">
            <FaImage /> Image
          </a>
          <a href="/tools/pdf">
            <FaFilePdf /> PDF
          </a>
          <a href="/tools/video">
            <FaVideo /> Video
          </a>
          <a href="/tools/music">
            <FaMusic /> Music
          </a>
        </div>

        {/* About */}
        <div className={styles.footerBlock}>
          <h4>About</h4>
          <a href="/portfolio">Creator</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>

        {/* Social */}
        <div className={styles.footerBlock}>
          <h4>Connect</h4>
          <a
            href="https://github.com/priyanshuv3"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/priyanshuv3"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        © 2025 Brahmastra Tools · Built by Priyanshu Verma
      </div>
    </footer>
  );
}
