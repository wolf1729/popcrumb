import { Platform, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const isWeb = Platform.OS === 'web' || typeof window !== 'undefined';

// Simple mapping for universal usage
export const Box = View;
export const Typography = Text;
export const Button = TouchableOpacity;
export const IconImage = Image;

export const useUniversalStyles = (webStyles, nativeStyles) => {
  return isWeb ? webStyles : nativeStyles;
};

export { StyleSheet };
