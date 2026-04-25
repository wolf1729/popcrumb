import React from 'react';

// Detection logic
const isNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

// Primitives for Web
const WebBox = (props) => <div {...props} />;
const WebText = (props) => <p {...props} />;
const WebButton = (props) => <button {...props} />;
const WebImage = (props) => <img {...props} />;

// Primitives for Native (lazy loaded or shimmed)
let NativeBox, NativeText, NativeButton, NativeImage;

try {
  const RN = require('react-native');
  NativeBox = RN.View;
  NativeText = RN.Text;
  NativeButton = RN.TouchableOpacity;
  NativeImage = RN.Image;
} catch (e) {
  // Fallback to web if native is missing
  NativeBox = WebBox;
  NativeText = WebText;
  NativeButton = WebButton;
  NativeImage = WebImage;
}

export const Box = isNative ? NativeBox : WebBox;
export const Typography = isNative ? NativeText : WebText;
export const Button = isNative ? NativeButton : WebButton;
export const IconImage = isNative ? NativeImage : WebImage;

export const Platform = {
  isNative,
  isWeb: !isNative,
  select: (obj) => (isNative ? obj.native : obj.web)
};
