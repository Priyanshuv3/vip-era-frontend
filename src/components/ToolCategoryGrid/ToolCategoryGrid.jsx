"use client";

import Link from "next/link";
import styles from "./ToolCategoryGrid.module.css";

const DEFAULT_INTRO =
  "A modern Astra Sangrah — a collection of digital astras crafted to solve everyday tasks with speed, clarity, and purpose.";

export default function ToolCategoryGrid({ category }) {
  if (!category) {
    console.error("ToolCategoryGrid requires a `category` prop");
    return null;
  }

  const {
    title,
    intro = DEFAULT_INTRO,
    tools,
  } = category;

  return (
    <section id="tools" className={styles.section}>
      {/* ================= HEADER ================= */}
      <div className={styles.header}>
        {title && (
          <h2 className={styles.sectionTitle}>{title}</h2>
        )}

        <p className={styles.sectionIntro}>
          {intro}
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className={styles.grid}>
        {tools.map(({ title, description, Icon, href }) => (
          <Link
            key={title}
            href={href}
            className={styles.card}
            aria-label={title}
          >
            <Icon className={styles.icon} />

            <h3 className={styles.cardTitle}>{title}</h3>

            {description && (
              <p className={styles.description}>
                {description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
