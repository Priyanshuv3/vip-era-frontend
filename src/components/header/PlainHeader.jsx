"use client";

import styles from "./header.module.css";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerTitle = pathname.split("/")[1];
  const formattedHeaderTitle = headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1);


  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
          <span className={styles.brand}>{formattedHeaderTitle}</span>
      </div>

      {/* Desktop nav */}
      <nav>
        <button
          onClick={toggleTheme}
          className="btn-minimal"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
      </nav>
    </header>
  );
}
