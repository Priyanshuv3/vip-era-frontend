import React from "react";
import PropTypes from "prop-types";
import styles from "./confirmationModal.module.css";

const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>{message || "Are you sure?"}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Define prop types for validation
ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired, // Ensure `message` is a required string
  onConfirm: PropTypes.func.isRequired, // Ensure `onConfirm` is a required function
  onCancel: PropTypes.func.isRequired, // Ensure `onCancel` is a required function
};

export default ConfirmationModal;
