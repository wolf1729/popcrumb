"use client";
import React from "react";
import Snackbar from "./Snackbar";
import { useSnackbar } from "./SnackbarContext";
import { Box, Platform } from "./Primitives";

const SnackbarContainer = () => {
  const { snackbars, snackbar: actions } = useSnackbar();

  const containerStyle = {
    position: Platform.isWeb ? 'fixed' : 'absolute',
    top: Platform.isWeb ? '1rem' : 40, // Top margin for native (avoiding status bar usually)
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
    paddingHorizontal: 16,
    pointerEvents: 'box-none', // Native compatible for pass-through
    ...Platform.select({
      web: {
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'none',
        width: '100%',
        maxWidth: '400px',
      }
    })
  };

  const listStyle = {
    flexDirection: 'column-reverse',
    gap: 12,
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      web: { display: 'flex' }
    })
  };

  return (
    <Box style={containerStyle}>
      <Box style={listStyle}>
        {snackbars?.map((item) => (
          <Box
            key={item.id}
            style={{ 
              pointerEvents: 'auto',
              marginBottom: Platform.isNative ? 12 : 0
            }}
          >
            <Snackbar
              variant={item.variant}
              message={item.message}
              icon={item.icon}
              exiting={item.exiting}
              onClose={() => actions.dismiss(item.id)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SnackbarContainer;
