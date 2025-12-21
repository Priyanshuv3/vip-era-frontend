import Image from "next/image";
import Script from "next/script";
import styles from "./Portfolio.module.css";
import {
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaLinkedin,
  FaLayerGroup,
  FaShieldAlt,
  FaVideo,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";

import Typewriter from "./Typewriter";

export default function Portfolio() {
  return (
    <>
      <Script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Priyanshu Verma",
            jobTitle: "Frontend Engineer",
            url: "https://priyanshuverma-mocha.vercel.app/portfolio",
            sameAs: [
              "https://linkedin.com/in/priyanshuv3",
              "https://x.com/priyanshuv3",
            ],
            knowsAbout: [
              "React",
              "Next.js",
              "Web Performance",
              "SSR",
              "Frontend Architecture",
              "ABR Streaming",
            ],
          }),
        }}
      />
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* IMAGE ON LEFT */}
          <div className={styles.rightBlock}>
            <div className={styles.imageWrapper}>
              <Image
                src="/portfolio/me.png"
                width={500}
                height={600}
                alt="Priyanshu Verma"
                className={styles.heroImage}
                priority
              />
            </div>
          </div>

          {/* TEXT ON RIGHT */}
          <div className={styles.leftBlock}>
            <h3 className={styles.smallText}>Hey, I'm</h3>

            <h1 className={styles.mainTitleGradient}>
              <Typewriter />
            </h1>

            <p className={styles.description}>
              Frontend Engineer building production-grade React & Next.js
              applications. I specialize in performance optimization, secure
              admin platforms, adaptive bitrate streaming, and scalable UI
              architecture with strong backend and infrastructure understanding.
            </p>

            <div className={styles.buttonRow}>
              <a href="#production" className="btn btn-primary">
                View Production Work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </div>

            <div className={styles.socials}>
              <a
                href="https://x.com/priyanshuv3"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
              >
                <FaTwitter />
              </a>

              <a
                href="https://linkedin.com/in/priyanshuv3"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
              >
                <FaLinkedin />
              </a>
              <a
                href="https://wa.me/917505273357"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Technical Focus</h2>

        <p className={styles.sectionText}>
          I enjoy building systems that feel fast, reliable, and thoughtfully
          engineered. My journey started with frontend development, but over
          time I naturally moved closer to backend systems, performance, and
          infrastructure — not to become a generalist, but to understand how
          products work end-to-end.
        </p>

        <p className={styles.sectionText}>
          This portfolio is a snapshot of what I’ve learned by building real
          production systems, breaking things, fixing them, and improving them
          iteratively.
        </p>
      </section>

      {/* PRODUCTION SYSTEMS */}
      <section id="production" className={styles.section}>
        <h2 className={styles.sectionTitle}>Production Systems</h2>

        <div className="cardGrid">
          <div className="card">
            <h3>Artoreal</h3>
            <p>
              Customer-facing artwork platform built with Next.js (SSR, SEO).
            </p>
            <a href="https://artoreal.com" target="_blank">
              Visit →
            </a>
          </div>

          <div className="card">
            <h3>Artoreal Artist</h3>
            <p>Artist management dashboard built using React.js.</p>
            <a href="https://artist.artoreal.com" target="_blank">
              Visit →
            </a>
          </div>

          <div className="card">
            <h3>Artoreal Studio</h3>
            <p>
              Fabric.js-powered image editor with PWA support and advanced
              canvas workflows.
            </p>
            <a href="https://studio.artoreal.com" target="_blank">
              Visit →
            </a>
          </div>

          <div className="card">
            <h3>nSepia Admin</h3>
            <p>
              Secure internal admin system with RBAC, bot detection, and ABR
              streaming.
            </p>
            <a href="https://nsepia.com" target="_blank">
              Visit →
            </a>
          </div>
        </div>
      </section>

      {/* OWNERSHIP */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Areas of Ownership</h2>

        <div className="cardGrid">
          <div className="card">
            <div className={styles.cardHeader}>
              <FaLayerGroup className={styles.cardIcon} />
              <h3>Frontend Architecture</h3>
            </div>

            <p>
              Component-driven design, SSR/ISR strategies, SEO optimization,
              predictable state management.
            </p>

            <a
              href="https://nextjs.org/docs/pages/building-your-application/rendering"
              target="_blank"
              rel="noreferrer"
              className={styles.referenceLink}
            >
              Learn about SSR / ISR →
            </a>
          </div>

          <div className="card">
            <div className={styles.cardHeader}>
              <FaShieldAlt className={styles.cardIcon} />
              <h3>Security & Bot Protection</h3>
            </div>

            <p>
              RBAC, protected routing, secure auth flows, Playwright-based
              bot-detection validation.
            </p>

            <a
              href="https://playwright.dev/docs/writing-tests"
              target="_blank"
              rel="noreferrer"
              className={styles.referenceLink}
            >
              Playwright E2E testing →
            </a>
          </div>

          <div className="card">
            <div className={styles.cardHeader}>
              <FaVideo className={styles.cardIcon} />
              <h3>Media & Performance</h3>
            </div>

            <p>
              Adaptive Bitrate Streaming (HLS/DASH), Core Web Vitals,
              Lighthouse-driven optimization.
            </p>

            <a
              href="https://docs.aws.amazon.com/mediaconvert/latest/ug/choosing-your-streaming-output-groups.html"
              target="_blank"
              rel="noreferrer"
              className={styles.referenceLink}
            >
              What is ABR streaming →
            </a>
          </div>

          <div className="card">
            <div className={styles.cardHeader}>
              <FaDatabase className={styles.cardIcon} />
              <h3>Backend & Data</h3>
            </div>

            <p>
              Django & DRF APIs, PostgreSQL optimization, Redis caching, Celery
              background processing.
            </p>

            <a
              href="https://docs.djangoproject.com/en/stable/"
              target="_blank"
              rel="noreferrer"
              className={styles.referenceLink}
            >
              Django documentation →
            </a>
          </div>

          <div className="card">
            <div className={styles.cardHeader}>
              <FaCloud className={styles.cardIcon} />
              <h3>Infrastructure</h3>
            </div>

            <p>
              AWS deployments, Dockerized services, CI/CD pipelines,
              OpenTofu-based IaC, k6 load testing.
            </p>

            <a
              href="https://developer.hashicorp.com/terraform/intro"
              target="_blank"
              rel="noreferrer"
              className={styles.referenceLink}
            >
              Infrastructure as Code →
            </a>
          </div>
        </div>
      </section>

      {/* HOW I BUILD */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>System Design & Implementation</h2>

        <p className={styles.sectionText}>
          I approach systems with a performance-first and security-aware
          mindset, choosing architecture and tooling based on real-world
          constraints.
        </p>

        <div className="cardGrid">
          <div className="card">
            <h3>Design</h3>
            <p>Modular UI, clear domain separation, predictable data flow.</p>
          </div>

          <div className="card">
            <h3>Build</h3>
            <p>
              React/Next.js frontends, Django APIs, PostgreSQL + Redis for data.
            </p>
          </div>

          <div className="card">
            <h3>Optimize</h3>
            <p>
              Performance profiling, ABR streaming, CDN caching, query tuning.
            </p>
          </div>

          <div className="card">
            <h3>Validate</h3>
            <p>
              Playwright E2E testing, bot detection flows, load testing with k6.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <h3>Nihilent Technology Ltd. — Senior Software Engineer</h3>
            <p className={styles.timelineDuration}>Aug 2023 – Present</p>
            <ul>
              <li>
                Architected secure admin systems with RBAC, protected APIs, and
                modular Next.js setup.
              </li>
              <li>
                Implemented Redux Toolkit, React Query, and advanced API caching
                strategies.
              </li>
              <li>
                Developed Fabric.js Studio Editor (PWA, cross-platform, image
                tools, asset library).
              </li>
              <li>
                Designed PostgreSQL views, triggers, and optimization strategies
                for high-traffic systems.
              </li>
              <li>
                Worked with ABR streaming, CDN optimization, caching, and media
                pipeline performance.
              </li>
              <li>
                Created full load-testing suites with k6 for performance and
                reliability validation.
              </li>
              <li>
                Built real-time WebSocket-based features using Django Channels +
                Redis.
              </li>
            </ul>
          </div>

          <div className={styles.timelineItem}>
            <h3>Webkul — Salesforce Developer — </h3>
            <p className={styles.timelineDuration}>Jan 2023 – Mar 2023</p>
            <ul>
              <li>
                Developed LWC, Aura Components, and Visualforce interfaces.
              </li>
              <li>Used SOQL to create dynamic data-driven UI flows.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>

        <p className={styles.sectionText}>
          Open to frontend roles, full-stack opportunities, and meaningful
          product collaborations. Feel free to reach out through any channel
          below.
        </p>

        <div className={styles.contactActions}>
          <a href="mailto:priyanshuvhj3@gmail.com" className="btn btn-primary">
            <FaEnvelope />
            <span>Email</span>
          </a>

          <a
            href="https://linkedin.com/in/priyanshuv3"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://wa.me/917505273357"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>
        </div>
      </section>
    </>
  );
}
