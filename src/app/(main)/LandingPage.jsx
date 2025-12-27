"use client";
import { Dragon, ToolCategoryGrid } from "@/components";
import { landing_tools } from "@/utils/category_data";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return;

      if (window.innerWidth <= 768) {
        let width = window.innerWidth * 0.9;
        canvasRef.current.style.height = `${width}px`;
        canvasRef.current.style.width = `${width}px`;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);
  return (
    <div className={styles.page}>
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroLeft}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.title}>
              The Ultimate <span>Online Tools Hub</span>
            </h1>

            <p className={styles.subtitle}>
              Fast, free, browser-based tools for images, PDFs, videos, music,
              fun utilities and more — all in one place.
            </p>

            <div className={styles.heroButtons}>
              <a href="/tools" className={styles.primaryBtn}>
                Explore Tools
              </a>
              <a href="/portfolio" className="btn btn-secondary">
                About the Creator
              </a>
            </div>
          </motion.div>

          <div className={styles.heroRight}>
            <Canvas ref={canvasRef} camera={{ position: [6, -2, 10], fov: 28 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[6, 6, 6]} intensity={1.2} />
              <Dragon />
            </Canvas>
          </div>
        </div>
      </section>

      {/* ================= TOOLS ================= */}
      <ToolCategoryGrid category={landing_tools} />

      {/* ================= WHY ================= */}
      <section className={styles.whySection}>
        <h2 className={styles.sectionTitle}>Why Use This Platform?</h2>

        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <h3>⚡ Lightning Fast</h3>
            <p>Optimized tools that work instantly in your browser.</p>
          </div>
          <div className={styles.whyCard}>
            <h3>🔐 Privacy First</h3>
            <p>No uploads stored. Everything stays on your device.</p>
          </div>
          <div className={styles.whyCard}>
            <h3>🛠 Purpose Built</h3>
            <p>Each tool solves a real-world problem.</p>
          </div>
          <div className={styles.whyCard}>
            <h3>🆓 Always Free</h3>
            <p>No login. No subscription. No friction.</p>
          </div>
        </div>
      </section>

      {/* ================= HOW ================= */}
      <section className={styles.howSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>

        <div className={styles.steps}>
          <div className={styles.step}>
            <span>01</span>
            <p>Choose a tool</p>
          </div>
          <div className={styles.step}>
            <span>02</span>
            <p>Provide input</p>
          </div>
          <div className={styles.step}>
            <span>03</span>
            <p>Get instant results</p>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO ================= */}
      <section id="about" className={styles.portfolioSection}>
        <div className={styles.portfolioCard}>
          <div className={styles.portfolioContent}>
            <h2 className={styles.sectionTitle}>
              Simple Tools. Built the Right Way.
            </h2>

            <p className={styles.portfolioText}>
              Brahmastra is built to solve everyday problems quickly — without
              logins, installs, or hidden limits. Every tool here is designed to
              be fast, private, and easy to use.
            </p>

            <p className={styles.portfolioText}>
              The platform is carefully crafted and maintained by an independent
              developer who values performance, usability, and clean design — so
              you can focus on getting things done.
            </p>

            <div className={styles.trustRow}>
              <div>⚡ Fast & Lightweight</div>
              <div>🔒 Privacy-Focused</div>
              <div>🆓 Always Free</div>
              <div>🛠 Actively Maintained</div>
            </div>

            <a href="/portfolio" className="btn btn-secondary">
              About the Creator →
            </a>
          </div>

          {/* subtle visual, not resume */}
          <div className={styles.portfolioVisual}>
            <div className={styles.orb} />
          </div>
        </div>
      </section>

      {/* ================= AUTH ================= */}
      <section className={styles.authSection}>
        <div className={styles.authCard}>
          <div className={styles.authContent}>
            <h2 className={styles.sectionTitle}>
              Create an Account (Optional)
            </h2>

            <p className={styles.authText}>
              You can use all tools without signing up. Create an account only
              if you want to save preferences, access future features, or manage
              your activity.
            </p>

            <div className={styles.authActions}>
              <a href="/login" className="btn btn-secondary">
                Log In
              </a>
              <a href="/login" className={styles.primaryBtn}>
                Sign Up
              </a>
            </div>

            <p className={styles.authNote}>
              No spam · No forced upgrades · Always optional
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
