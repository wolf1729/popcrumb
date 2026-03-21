"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([]);

  const removeSnackbar = useCallback((id) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const dismissSnackbar = useCallback((id) => {
    setSnackbars((prev) =>
      prev.map((s) => (s.id === id ? { ...s, exiting: true } : s))
    );
    setTimeout(() => {
      removeSnackbar(id);
    }, 300);
  }, [removeSnackbar]);

  const addSnackbar = useCallback(
    (message, variant = "info", options = {}) => {
      const { id: manualId, duration = 5000, icon } =
        typeof options === "number" ? { duration: options } : options;

      const id = manualId || Math.random().toString(36).substr(2, 9);

      // Replace existing if ID matches
      if (manualId) {
        setSnackbars((prev) => prev.filter((s) => s.id !== manualId));
      }

      const resolvedMessage =
        typeof message === "function" ? message({ id }) : message;

      setSnackbars((prev) => [
        ...prev,
        { id, message: resolvedMessage, variant, duration, icon },
      ]);

      if (duration && duration !== Infinity) {
        setTimeout(() => dismissSnackbar(id), duration);
      }
      return id;
    },
    [dismissSnackbar],
  );

  const snackbarActions = {
    success: (msg, opts) => addSnackbar(msg, "success", opts),
    error: (msg, opts) => addSnackbar(msg, "error", opts),
    warning: (msg, opts) => addSnackbar(msg, "warning", opts),
    info: (msg, opts) => addSnackbar(msg, "info", opts),
    dismiss: (id) => dismissSnackbar(id),
  };

  return (
    <SnackbarContext.Provider value={{ snackbars, snackbar: snackbarActions }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);

// Global Singleton
let snackbarRef = null;
export const snackbar = {
  success: (msg, opts) => snackbarRef?.success(msg, opts),
  error: (msg, opts) => snackbarRef?.error(msg, opts),
  warning: (msg, opts) => snackbarRef?.warning(msg, opts),
  info: (msg, opts) => snackbarRef?.info(msg, opts),
  dismiss: (id) => snackbarRef?.dismiss(id),
};

export const SnackbarManager = () => {
  const { snackbar: instance } = useSnackbar();
  snackbarRef = instance;
  return null;
};
