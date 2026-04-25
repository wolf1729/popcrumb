"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconImage, Platform } from "./Primitives";
import { SuccessIcon, ErrorIcon, WarningIcon, InfoIcon, CloseIcon } from "./Icons";

const variantIcons = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

const Snackbar = ({ variant = "info", message, icon, onClose, showClose = true, exiting }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // requestAnimationFrame is available on both
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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12, // Native compatible
    paddingHorizontal: 16,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    
    // Platform specific
    ...Platform.select({
      web: {
        padding: '0.75rem 1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.95)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      native: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        transform: [
          { translateY: visible ? 0 : -8 },
          { scale: visible ? 1 : 0.95 }
        ],
        opacity: visible ? 1 : 0,
      }
    })
  };

  const contentStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    ...Platform.select({
      web: { display: 'flex' }
    })
  };

  const iconWrapperStyle = {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: variant === 'success' ? 'rgba(34, 197, 94, 0.2)' :
                     variant === 'error' ? 'rgba(239, 68, 68, 0.2)' :
                     variant === 'warning' ? 'rgba(234, 179, 8, 0.2)' :
                     'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { display: 'flex', flexShrink: 0 }
    })
  };

  const textStyle = {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    ...Platform.select({
      web: { 
        margin: 0, 
        lineHeight: '1.25rem',
        wordBreak: 'break-word' 
      }
    })
  };

  return (
    <Box style={containerStyle}>
      <Box style={contentStyle}>
        <Box style={iconWrapperStyle}>
          {icon ? (
            typeof icon === 'string' ? (
              <IconImage source={{ uri: icon }} style={{ width: 32, height: 32, borderRadius: 16 }} />
            ) : (
              icon
            )
          ) : (
            variantIcons[variant] || variantIcons.info
          )}
        </Box>
        <Box style={{ flex: 1 }}>
          {typeof message === "string" ? (
            <Typography style={textStyle}>
              {message}
            </Typography>
          ) : (
            <Box>{message}</Box>
          )}
        </Box>
      </Box>
      {showClose && (
        <Button
          onPress={handleClose}
          onClick={handleClose} // Both for compatibility
          style={{
            marginLeft: 16,
            padding: 4,
            ...Platform.select({
              web: {
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }
            })
          }}
        >
          <Box style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            <CloseIcon />
          </Box>
        </Button>
      )}
    </Box>
  );
};

export default Snackbar;
