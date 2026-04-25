"use client";
import React from "react";
import Snackbar from "./Snackbar";
import { useSnackbar } from "./SnackbarContext";

const SnackbarContainer = () => {
  const { snackbars, snackbar: actions } = useSnackbar();

  return (
    <div 
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        width: '100%',
        maxWidth: '400px',
        padding: '0 1rem'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '0.75rem',
        width: '100%'
      }}>
        {snackbars?.map((item) => (
          <div
            key={item.id}
            style={{ 
              pointerEvents: 'auto',
              transition: 'all 0.3s ease'
            }}
          >
            <Snackbar
              variant={item.variant}
              message={item.message}
              icon={item.icon}
              exiting={item.exiting}
              onClose={() => actions.dismiss(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnackbarContainer;
