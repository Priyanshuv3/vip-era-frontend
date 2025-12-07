import Image from "next/image";
import styles from "./Portfolio.module.css";

export default function Portfolio() {
  return (
    <>
      {/* ------------------------------------------------ */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------ */}
      <section className={styles.heroSection}>
        <div className={styles.container}>

          <div className={styles.leftBlock}>
            <h3 className={styles.smallText}>Hello, I'm</h3>
            <h1 className={styles.mainTitle}>Priyanshu Verma</h1>

            <p className={styles.description}>
              A Frontend-focused Full Stack Developer specializing in secure,
              scalable, and high-performance applications. I build modern admin
              panels, real-time systems, and production-grade architectures using
              Next.js, React, Django, and PostgreSQL — turning complex requirements
              into clean, fast, and reliable user experiences.
            </p>

            <div className={styles.buttonRow}>
              <a href="#work" className={styles.primaryButton}>View My Work</a>
              <a href="#resume" className={styles.secondaryButton}>My Resume</a>
            </div>

            <div className={styles.socials}>
              <a href="https://x.com/priyanshuv3" className={styles.socialIcon}>𝕏</a>
              <a href="https://linkedin.com/in/priyanshuv3" className={styles.socialIcon}>in</a>
              <a href="https://github.com/priyanshuv3" className={styles.socialIcon}>GH</a>
            </div>
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.imageWrapper}>
              <Image
                src="portfolio/me.png"
                width={500}
                height={600}
                alt="Priyanshu Verma"
                className={styles.heroImage}
                quality={100}
                priority
                unoptimized
              />
            </div>
          </div>

        </div>
      </section>


      {/* ------------------------------------------------ */}
      {/* ABOUT SECTION */}
      {/* ------------------------------------------------ */}
      <section id="about" className={styles.section}>
        <h2 className={styles.sectionTitle}>About Me</h2>

        <p className={styles.sectionText}>
          I'm a Full Stack Developer with strong expertise in frontend engineering
          and secure backend architectures. I specialize in building robust admin
          panels, CMS systems, modular UI frameworks, and real-time applications.
          With nearly 2 years of professional experience, I build systems that are
          scalable, fast, and secure — combining modern frontend tooling with
          stable backend engineering.
        </p>
      </section>


      {/* ------------------------------------------------ */}
      {/* SKILLS SECTION */}
      {/* ------------------------------------------------ */}
      <section id="skills" className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>

        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <h3>Frontend</h3>
            <p>React.js, Next.js, Redux Toolkit, React Query, Axios Interceptors,
               JavaScript (ES6+), HTML, CSS, PWA, Fabric.js</p>
          </div>

          <div className={styles.skillCard}>
            <h3>Backend</h3>
            <p>Python, Django, Django REST Framework, JWT Auth, Session Management</p>
          </div>

          <div className={styles.skillCard}>
            <h3>Database</h3>
            <p>PostgreSQL, Materialized Views, Triggers, Functions, Redis</p>
          </div>

          <div className={styles.skillCard}>
            <h3>Tools</h3>
            <p>Git, GitHub, GitLab, Postman, pgAdmin, Portainer,
               WinMerge, Lighthouse, VSCode</p>
          </div>
        </div>
      </section>


      {/* ------------------------------------------------ */}
      {/* EXPERIENCE SECTION */}
      {/* ------------------------------------------------ */}
      <section id="experience" className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <div className={styles.timeline}>

          <div className={styles.timelineItem}>
            <h3>Nihilent Technology Ltd.</h3>
            <p className={styles.timelineDuration}>Aug 2023 – Present</p>
            <ul>
              <li>Built secure admin panel with RBAC, protected APIs, modular architecture</li>
              <li>Integrated Next.js proxies, middleware & production-grade folder structure</li>
              <li>Implemented Redux Toolkit, React Query, Axios Interceptors</li>
              <li>Developed Fabric.js Studio Editor (PWA + cross-platform support)</li>
              <li>Optimized Django + PostgreSQL backend using views, triggers & functions</li>
            </ul>
          </div>

          <div className={styles.timelineItem}>
            <h3>Salesforce Developer — Webkul</h3>
            <p className={styles.timelineDuration}>Jan 2023 – Mar 2023</p>
            <ul>
              <li>Worked on LWC, Aura Components, Visualforce</li>
              <li>Performed SOQL operations and dynamic Apex-based UI logic</li>
            </ul>
          </div>

        </div>
      </section>


      {/* ------------------------------------------------ */}
      {/* PROJECTS SECTION */}
      {/* ------------------------------------------------ */}
      <section id="work" className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>

        <div className={styles.projectsGrid}>

          <div className={styles.projectCard}>
            <h3>Next.js Admin Panel + Django CMS</h3>
            <p>Secure admin system with role-based access, protected APIs, dynamic forms,
               SSR/CSR hybrid rendering, and production-level architecture.</p>
          </div>

          <div className={styles.projectCard}>
            <h3>Emotion-Based Recommender System</h3>
            <p>Real-time system using Django Channels, OpenCV, WebSockets and
               multi-source emotion scoring with admin-configurable weights.</p>
          </div>

          <div className={styles.projectCard}>
            <h3>Studio Editor (Fabric.js)</h3>
            <p>Feature-rich image editor with auto-collage, asset libraries, canvas tools,
               PWA optimization & cross-platform compatibility.</p>
          </div>

          <div className={styles.projectCard}>
            <h3>OCR Handwritten Code Compiler</h3>
            <p>OCR-based program execution system enabling handwritten code → live output
               using third-party APIs & dynamic components.</p>
          </div>

        </div>
      </section>


      {/* ------------------------------------------------ */}
      {/* EDUCATION SECTION */}
      {/* ------------------------------------------------ */}
      <section id="resume" className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>

        <div className={styles.educationList}>
          <div className={styles.educationItem}>
            <h3>B.Tech — Computer Science</h3>
            <p>Uttarakhand Technical University — 74.5%</p>
          </div>

          <div className={styles.educationItem}>
            <h3>Class 12 — CBSE</h3>
            <p>The Indian Public School — 80%</p>
          </div>

          <div className={styles.educationItem}>
            <h3>Class 10 — CBSE</h3>
            <p>The Indian Public School — 8.8 CGPA</p>
          </div>
        </div>
      </section>


      {/* ------------------------------------------------ */}
      {/* CONTACT SECTION */}
      {/* ------------------------------------------------ */}
      <section id="contact" className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p className={styles.sectionText}>
          Want to collaborate, hire, or discuss a project?  
          Feel free to reach out!
        </p>

        <div className={styles.contactBox}>
          <p><strong>Email:</strong> priyanshuv3@gmail.com</p>
          <p><strong>GitHub:</strong> github.com/priyanshuv3</p>
          <p><strong>LinkedIn:</strong> linkedin.com/in/priyanshuv3</p>
        </div>
      </section>
    </>
  );
}
