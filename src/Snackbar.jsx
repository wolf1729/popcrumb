"use client";
import React, { useEffect, useState } from "react";

const Snackbar = ({ variant = "info", message, onClose, showClose = true, exiting }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (exiting) {
      setVisible(false);
    }
  }, [exiting]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`flex items-center justify-between w-full max-w-md px-4 py-3 bg-white rounded-lg shadow-md transform transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-2 opacity-0 scale-95"}`}
    >
      <div className="flex items-center space-x-3 overflow-hidden w-full">
        {/* Render Icon and Message logic here... */}
        <div className="flex-1 min-w-0">
          {typeof message === "string" ? (
            <p className="text-sm font-medium text-gray-700 truncate">
              {message}
            </p>
          ) : (
            <div className="text-sm font-medium text-gray-700">{message}</div>
          )}
        </div>
      </div>
      {showClose && (
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Snackbar;
