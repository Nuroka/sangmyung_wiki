import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ open, children, onClose }) {
  useEffect(() => {
    //Esc 키나 화면 밖을 클릭하면 닫히도록
    const handleEscape = (event) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
