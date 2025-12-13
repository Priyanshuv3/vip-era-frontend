'use client';

import styles from './header.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className={styles.brand}>Brahmastra</Link>
      </div>

      {/* Desktop nav */}
      <nav className={styles.desktopNav}>
        <Link href="/">Home</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/login">Sign Up</Link>

        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/tools" onClick={() => setMenuOpen(false)}>Tools</Link>
          <Link href="/login" onClick={() => setMenuOpen(false)}>Sign up</Link>

          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className={styles.themeToggle}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      )}
    </header>
  );
}
