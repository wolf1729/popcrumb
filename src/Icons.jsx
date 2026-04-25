import React from 'react';
import { Platform, Box } from './Primitives.js';

// Lazy load react-native-svg if on native
let Svg, Path, Circle, Line;
if (Platform.isNative) {
  try {
    const RNSvg = require('react-native-svg');
    Svg = RNSvg.Svg;
    Path = RNSvg.Path;
    Circle = RNSvg.Circle;
    Line = RNSvg.Line;
  } catch (e) {
    console.warn('react-native-svg not found. Icons will not render on native.');
  }
}

const IconWrapper = ({ children, webSvg }) => {
  if (Platform.isNative && Svg) {
    return <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{children}</Svg>;
  }
  return webSvg;
};

export const SuccessIcon = () => (
  <IconWrapper 
    webSvg={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
  >
    <Path d="M20 6L9 17l-5-5"/>
  </IconWrapper>
);

export const ErrorIcon = () => (
  <IconWrapper 
    webSvg={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
  >
    <Circle cx="12" cy="12" r="10"/><Line x1="15" y1="9" x2="9" y2="15"/><Line x1="9" y1="9" x2="15" y2="15"/>
  </IconWrapper>
);

export const WarningIcon = () => (
  <IconWrapper 
    webSvg={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
  >
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><Line x1="12" y1="9" x2="12" y2="13"/><Line x1="12" y1="17" x2="12.01" y2="17"/>
  </IconWrapper>
);

export const InfoIcon = () => (
  <IconWrapper 
    webSvg={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
  >
    <Circle cx="12" cy="12" r="10"/><Line x1="12" y1="16" x2="12" y2="12"/><Line x1="12" y1="8" x2="12.01" y2="8"/>
  </IconWrapper>
);

export const CloseIcon = () => (
  <IconWrapper 
    webSvg={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>}
  >
    <Path d="M18 6L6 18M6 6l12 12" />
  </IconWrapper>
);
