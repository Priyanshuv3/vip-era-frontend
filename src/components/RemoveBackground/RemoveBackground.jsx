"use client";

import React, { useState } from "react";
import styles from "./remove-background.module.css";
import { removeBackground } from "@imgly/background-removal";
import { useDispatch } from "react-redux";
import { setLoadingModal } from "@/redux/reducers/commonModalSlice";

export default function RemoveBackground() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOriginalImage(URL.createObjectURL(file));

    try {
      dispatch(setLoadingModal(true))

      const resultBlob = await removeBackground(file, {
        output: {
          format: "image/png", // Highest quality transparent PNG
        },
      });

      const url = URL.createObjectURL(resultBlob);
      setProcessedImage(url);
    } catch (err) {
      console.error("Background removal failed:", err);
    } finally {
      dispatch(setLoadingModal(false));
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "background-removed.png";
    link.click();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Remove Background (High Quality)</h2>

      <input
        type="file"
        accept="image/*"
        className={styles.upload}
        onChange={handleUpload}
      />

      {loading && <p className={styles.loading}>Processing… Please wait.</p>}

      <div className={styles.previewContainer}>
        {originalImage && (
          <div>
            <h3>Original</h3>
            <img src={originalImage} className={styles.preview} alt="original" />
          </div>
        )}

        {processedImage && (
          <div className={styles.finalContainer}>
            <h3>Background Removed</h3>
            <img
              src={processedImage}
              className={styles.preview}
              alt="result"
            />

            <button onClick={downloadImage}>
              Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
