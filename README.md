# Popcrumb - Universal Snackbar & Toast Library

A professional, lightweight, and **Universal** snackbar/toast library built for **React, Next.js, Expo, and React Native**. It supports rich content, manual dismissal, and deterministic IDs with a premium look and feel on all platforms.

## 🚀 Overview

This library allows you to trigger snackbars from anywhere in your codebase—including outside of components—using a simple `snackbar.success()` style API. It automatically detects if it's running on the Web or Mobile and adapts its UI and logic accordingly.

## 🛠️ Installation

```bash
npm install popcrumb
```

### 📱 For Expo / React Native Users
You must also install `react-native-svg` to render the default icons:
```bash
npx expo install react-native-svg
# or
npm install react-native-svg
```

## 📖 Universal Usage

Popcrumb is designed to work with the same API across all platforms. However, the root integration differs slightly between Web and Mobile to handle the respective layout engines.

### 🌐 Web Integration (Next.js / React)

Add the components to your root layout or main App file:

```jsx
// app/layout.js or App.js
import { SnackbarProvider, SnackbarManager, SnackbarContainer } from "popcrumb";

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

### 📱 Mobile Integration (Expo / React Native)

Ensure you have `react-native-svg` installed. Wrap your root component and place the container at the bottom of the stack.

```jsx
// App.js
import { View } from "react-native";
import { SnackbarProvider, SnackbarManager, SnackbarContainer } from "popcrumb";

export default function App() {
  return (
    <SnackbarProvider>
      <SnackbarManager />
      {/* Container should be outside your main scroll/view for fixed positioning */}
      <View style={{ flex: 1 }}>
         {/* Your Navigation or Screens */}
      </View>
      <SnackbarContainer />
    </SnackbarProvider>
  );
}
```

### 📣 Triggering Alerts (Same for both!)

Once integrated, you can trigger alerts from **anywhere** (components, utility files, or even API middleware) using the same global API:

```typescript
import { snackbar } from "popcrumb";

// Basic usage
snackbar.success("Action completed!");

// With options
snackbar.error("Connection lost", {
  duration: 3000,
  id: "connection-error"
});
```

### Custom Icons / Images

You can customize the icon displayed in the snackbar by passing an `icon` property. This can be a string URL for an image, or a custom React component!

```javascript
// Using an image URL (Works on Web & Mobile)
snackbar.success("Welcome back!", {
  icon: "https://avatars.githubusercontent.com/u/9919?s=64&v=4" 
});

// Using a custom React Node / SVG
snackbar.info("Processing...", {
  icon: <MyCustomSpinnerIcon />
});
```

### Advanced: Manual Dismissal

```javascript
// Show a specific toast
snackbar.error("Server is down", { id: "server-down" });

// Later, when fixed, dismiss it specifically by its ID
snackbar.dismiss("server-down");
```

### Advanced: Functional Messages

You can pass a function as the message to access the `id` of the snackbar dynamically.

```jsx
snackbar.info(
  ({ id }) => (
    <Box style={{ gap: 8 }}>
      <Typography>Please upgrade your plan.</Typography>
      <Button onPress={() => snackbar.dismiss(id)}>
        <Typography style={{ color: '#3b82f6' }}>Upgrade Now</Typography>
      </Button>
    </Box>
  ),
  { id: "upgrade-notice" },
);
```

## 🎨 Features
- **Cross-Platform**: Works on Web (Next.js/React) and Mobile (Expo/React Native).
- **Global API**: No hooks required to trigger alerts.
- **Auto-Styling**: Premium design using inline styles (no CSS/Tailwind required).
- **Customizable**: Pass custom React components or images as icons.
- **Lightweight**: Zero-dependency for web (except React).

## 📝 API Reference

The `snackbar` object provides the following methods:

### Core Methods
| Method | Description |
|--------|-------------|
| `snackbar.success(message, options?)` | Shows a success snackbar. |
| `snackbar.error(message, options?)` | Shows an error snackbar. |
| `snackbar.warning(message, options?)` | Shows a warning snackbar. |
| `snackbar.info(message, options?)` | Shows an info snackbar. |
| `snackbar.dismiss(id)` | Dismisses a specific snackbar by its ID. |

### Options Object
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | `number` | `4000` | Auto-dismiss duration in milliseconds. Use `Infinity` for manual dismissal only. |
| `id` | `string` | (Auto-generated) | Unique identifier for the snackbar. |
| `icon` | `ReactNode` or `string` | (Variant default) | Custom icon to display. |
| `onOpen` | `() => void` | `undefined` | Callback when snackbar opens. |
| `onClose` | `() => void` | `undefined` | Callback when snackbar closes. |

### Example
```javascript
import { snackbar } from "popcrumb";

// Show with custom duration and ID
snackbar.info("Processing...", {
  duration: 6000,
  id: "process-1"
});
```
