# Popcrumb - Snackbar & Toast Library

A professional, lightweight, and globally accessible snackbar/toast library built with React (Next.js compatible). It supports rich content, manual dismissal, and deterministic IDs.

## 🚀 Overview

This library allows you to trigger snackbars from anywhere in your codebase—including outside of components—using a simple `snackbar.success()` style API.

## 🛠️ Installation

```bash
npm install popcrumb
```

*(Note: Requires `react` and `react-dom` as peer dependencies).*

## 📖 Usage

### 1. Root Integration

Add the **Provider** and **Container** to your root layout or app wrapper:

```jsx
import {
  SnackbarProvider,
  SnackbarManager,
  SnackbarContainer,
} from "popcrumb";

export default function RootLayout({ children }) {
  return (
    <SnackbarProvider>
      <SnackbarManager />
      {children}
      <SnackbarContainer />
    </SnackbarProvider>
  );
}
```

### 2. Triggering Alerts

Import `snackbar` from `crouton` anywhere to show alerts:

```typescript
import { snackbar } from "popcrumb";

snackbar.success("Profile updated!");
snackbar.error("Failed to save changes.");
snackbar.warning("Low battery detected.");
snackbar.info("New message received.");
```

### Options Object

All methods accept an optional second argument (either a `duration` in ms or an `options` object).

```javascript
snackbar.info("Uploading...", {
  id: "upload-toast", // Manual ID
  duration: 10000, // 10 seconds
});

// To keep a snackbar open indefinitely:
snackbar.info("Persistent message", { duration: Infinity });
```

### Advanced: Manual Dismissal

```javascript
// Show a specific toast
snackbar.error("Server is down", { id: "server-down" });

// Later, when fixed, dismiss it specifically by its ID
snackbar.dismiss("server-down");
```

### Advanced: Functional Messages (Self-Dismissal)

```jsx
snackbar.info(
  ({ id }) => (
    <div className="flex flex-col gap-2">
      <p>Please upgrade your plan.</p>
      <button onClick={() => snackbar.dismiss(id)}>Close Me</button>
    </div>
  ),
  { id: "upgrade-notice" },
);
```

### Tailwind CSS Note

The library relies on Tailwind CSS classes (`flex`, `bg-white`, `rounded-lg`, etc.). If your project does not use Tailwind CSS, ensure you configure it or add equivalent styles for the snackbar to display correctly.