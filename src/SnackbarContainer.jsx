"use client";
import React from "react";
import Snackbar from "./Snackbar";
import { useSnackbar } from "./SnackbarContext";

const SnackbarContainer = () => {
  const { snackbars, snackbar: actions } = useSnackbar();

  return (
    <div className="fixed top-4 inset-x-0 z-[9999] flex flex-col items-center pointer-events-none">
      <div className="flex flex-col-reverse space-y-reverse space-y-4 w-full max-w-md">
        {snackbars?.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto transform transition-all duration-300"
          >
            <Snackbar
              variant={item.variant}
              message={item.message}
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
