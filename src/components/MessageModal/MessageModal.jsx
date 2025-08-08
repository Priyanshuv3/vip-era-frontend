import React from "react";
import PropTypes from "prop-types";
import styles from "./messageModal.module.css";
import { useDispatch } from "react-redux";
import { setMessageModal } from "@/redux/reducers/commonModalSlice";

const MessageModal = ({ show, type, message, onClose, response }) => {  
  const dispatch = useDispatch();
  if (!show) return null;
  let dynamicMessage = message;
  let dynamicType = type;

  if (response) {
    if(response?.status === 200) {
      dynamicType = "success";
      dynamicMessage = response.detail || "Operation completed successfully.";
    }else{
      dynamicType = "error";
      dynamicMessage = response.detail || "An unexpected error occurred.";
    }
  }

  const modalStyles = {
    success: styles.successModal,
    error: styles.errorModal,
    warning: styles.warningModal,
    info: styles.infoModal,
  };
  const handleClose = () => {
    dispatch(setMessageModal({ show: false, message: "", type: "", onClose: null, response: {} }));
    if (onClose) {
      onClose();
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${modalStyles[dynamicType]}`}>
        <p className={styles.modalMessage}>{dynamicMessage}</p>
        <button className={styles.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Define prop types for validation
MessageModal.propTypes = {
  show: PropTypes.bool.isRequired, // Ensure `show` is a required boolean
  type: PropTypes.oneOf(["success", "error", "warning", "info"]), // Limit `type` to specific values
  message: PropTypes.string, // Ensure `message` is a string (optional)
  response: PropTypes.object, // Allow a simple object for `response` (optional)
  onClose: PropTypes.func, // Ensure `onClose` is a required function
};

export default MessageModal;