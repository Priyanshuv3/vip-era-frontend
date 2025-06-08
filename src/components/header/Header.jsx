'use client';
import styles from './header.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', stored);
    setTheme(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className={styles.brand}>VipEra</Link>
      </div>

      {/* Desktop nav */}
      <nav className={styles.desktopNav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
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

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <button onClick={() => { toggleTheme(); closeMenu(); }} className={styles.themeToggle}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      )}
    </header>
  );
}
