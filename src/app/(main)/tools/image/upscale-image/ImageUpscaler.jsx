"use client";

import { useState } from "react";
import Pica from "pica";
import styles from "./ImageUpscaler.module.css";

const pica = Pica();

export default function ImageUpscaler() {
  const [original, setOriginal] = useState(null);
  const [upscaled, setUpscaled] = useState(null);
  const [loading, setLoading] = useState(false);

  const upscaleImage = async (file, scale = 2) => {
    setLoading(true);
    setUpscaled(null);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    const srcCanvas = document.createElement("canvas");
    srcCanvas.width = img.width;
    srcCanvas.height = img.height;
    srcCanvas.getContext("2d").drawImage(img, 0, 0);

    const dstCanvas = document.createElement("canvas");
    dstCanvas.width = img.width * scale;
    dstCanvas.height = img.height * scale;

    await pica.resize(srcCanvas, dstCanvas, {
      quality: 3,
      alpha: true,
    });

    const blob = await pica.toBlob(dstCanvas, "image/png", 1);
    setUpscaled(URL.createObjectURL(blob));
    setLoading(false);
  };

  const downloadImage = () => {
    if (!upscaled) return;
    const link = document.createElement("a");
    link.href = upscaled;
    link.download = "upscaled-image.png";
    link.click();
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Image Upscaler</h2>

      <input
        type="file"
        accept="image/*"
        className={styles.fileInput}
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          setOriginal(URL.createObjectURL(file));
          upscaleImage(file, 2);
        }}
      />

      {loading && <p className={styles.loading}>Upscaling image…</p>}

      <div className={styles.previewRow}>
        {original && (
          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Original</h4>
            <img src={original} className={styles.image} alt="Original" />
          </div>
        )}

        {upscaled && (
          <div className={styles.card}>
            <h4 className={styles.cardTitle}>Upscaled (2×)</h4>
            <img src={upscaled} className={styles.image} alt="Upscaled" />

            <button className={styles.downloadBtn} onClick={downloadImage}>
              Download PNG
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
