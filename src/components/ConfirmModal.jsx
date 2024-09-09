import React, { useEffect, useRef, useState } from "react";
import approval from "/approved.png";
import { Link } from "react-router-dom";

export default function ConfirmModal({ showModal }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      setProgress(0); // Reset progress state when modal is shown
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(intervalRef.current);
            return 100;
          }
          return prevProgress + 2;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [showModal]);

  return (
    <dialog open={showModal} className="modal">
      <div className="modal-heading">
        <p>Order Approved</p>
        <img src={approval} alt="approval pic" />
      </div>

      <p>Look over the new collection</p>

      <p className="view-button">Thank You</p>

      <progress className="progress-bar" value={progress} max="100"></progress>
    </dialog>
  );
}
