"use client";
import React, { useEffect, useState } from "react";

const icons = {
  success: (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
  ),
  error: (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
    </div>
  ),
  warning: (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>
  ),
  info: (
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    </div>
  )
};

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
        {icons[variant] || icons.info}
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
