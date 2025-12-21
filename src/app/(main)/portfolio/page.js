import Image from "next/image";
import styles from "./Portfolio.module.css";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import Typewriter from "./Typewriter";

export default function Portfolio() {
  return (
    <>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.leftBlock}>
            <div className={styles.leftBlock}>
              <h3 className={styles.smallText}>Hey, I'm</h3>

              <h1 className={styles.mainTitleGradient}>
                <Typewriter />
              </h1>
            </div>

          <p className={styles.description}>
            Frontend Engineer specializing in building high-performance, scalable web
            systems. I own frontend architecture in production environments — from
            complex UI systems and performance optimization to SEO, SSR/ISR strategies,
            and secure admin platforms — with strong backend and infrastructure
            understanding to design systems correctly end-to-end.
          </p>

            <div className={styles.buttonRow}>
              <a href="#work" className={styles.primaryButton}>
                View My Work
              </a>
              <a href="#resume" className={styles.secondaryButton}>
                My Resume
              </a>
            </div>

            <div className={styles.socials}>
              <a
                href="https://x.com/priyanshuv3"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
              >
                <FaXTwitter />
              </a>

              <a
                href="https://linkedin.com/in/priyanshuv3"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.imageWrapper}>
              <Image
                src="/portfolio/me.png"
                width={500}
                height={600}
                alt="Priyanshu Verma"
                className={styles.heroImage}
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className={styles.section}>
        <h2 className={styles.sectionTitle}>About Me</h2>

        <p className={styles.sectionText}>
          I’m a Full-Stack Developer focused on building modern web
          architectures with an emphasis on security, scalability, and
          performance. I design modular admin systems, real-time apps using
          WebSockets, high-performance Next.js frontends, and reliable Django +
          PostgreSQL backends. I also work with ABR streaming, caching layers,
          CDN optimization, load testing with k6, and OpenTofu-based infra
          automation.
        </p>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>

        <div className="cardGrid">
          <div className="card">
            <h3>Frontend Engineering</h3>
            <p>
              Next.js, React.js, Redux Toolkit, React Query, Axios Interceptors,
              Fabric.js, PWA, SEO, SSR/CSR/ISR, Tailwind
            </p>
          </div>

          <div className="card">
            <h3>Backend & APIs</h3>
            <p>
              Django, DRF, JWT, Session Auth, WebSockets, Redis, Celery, robust
              API design & security
            </p>
          </div>

          <div className="card">
            <h3>Database & System Design</h3>
            <p>
              PostgreSQL, Materialized Views, Triggers, PL/pgSQL, Query
              Optimization, Caching Strategies
            </p>
          </div>

          <div className="card">
            <h3>DevOps & Infrastructure</h3>
            <p>
              OpenTofu/Terraform, k6 Load Testing, AWS (EC2, ECS, S3, VPC, Route 53,
              CloudFront), CI/CD, Docker, Portainer
            </p>
          </div>

          <div className="card">
            <h3>Tools</h3>
            <p>Git, GitHub, GitLab, Postman, Putty, pgAdmin, Lighthouse, VSCode</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <h3>Nihilent Technology Ltd. — Full Stack Developer</h3>
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
            <h3>Salesforce Developer — Webkul</h3>
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

      {/* PROJECTS SECTION */}
      <section id="work" className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>

        <div className="cardGrid">
          <div className="card">
            <h3>Enterprise Admin Panel (Next.js + Django)</h3>
            <p>
              Secure dashboard with RBAC, protected APIs, hybrid SSR/CSR
              rendering, caching layers, audit logs, and modular
              production-grade architecture.
            </p>
          </div>

          <div className="card">
            <h3>Emotion-Based Recommender System</h3>
            <p>
              Real-time recommendation engine built with Django Channels,
              WebSockets, OpenCV emotion signals, weighted sentiment scoring,
              and rule-based logic.
            </p>
          </div>

          <div className="card">
            <h3>Fabric.js Studio (PWA)</h3>
            <p>
              Full design editor with layers, canvas tools, transformations,
              auto-collage, asset library, and PWA-level performance.
            </p>
          </div>

          <div className="card">
            <h3>OCR Handwritten Code Compiler</h3>
            <p>
              Converts handwritten code into executable output using OCR,
              parsing, and dynamic code execution logic.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p className={styles.sectionText}>
          Looking for collaboration, hiring, or a project discussion? I&apos;m
          always open to meaningful conversations.
        </p>
      </section>
    </>
  );
}
