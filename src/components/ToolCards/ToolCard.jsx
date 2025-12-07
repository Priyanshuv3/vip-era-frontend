"use client";

import Link from "next/link";
import styles from "./tool-card.module.css";

export default function ToolCard({ name, slug, description, icon }) {
  return (
    <Link href={`/tools/${slug}`} className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3>{name}</h3>
      <p>{description}</p>
    </Link>
  );
}
