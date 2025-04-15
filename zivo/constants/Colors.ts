const tintColorLight = '#fff7ed';
const tintColorDark = '#fff';

const shadowLight = '0px 2px 4px rgba(0, 0, 0, 0.1)';
const shadowDark = '0px 2px 4px rgba(0, 0, 0, 0.3)';

const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px',
};

const spacing = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
};

export const Colors = {
  light: {
    text: '#11181C', // Text color for light mode
    background: '#fff7ed', // Background color for light mode
    tint: tintColorLight, // Tint color for light mode
    icon: '#687076', // Icon color for light mode
    tabIconDefault: '#687076', // Default tab icon color for light mode
    tabIconSelected: tintColorLight, // Selected tab icon color for light mode
    border: '#E5E7EB', // Border color for light mode
    inputBackground: '#FFF1E7', // Input background color for light mode
    placeholder: '#a3a3a3', // Placeholder text color for light mode
    inputBorder: '#E5E7EB', // Input border color for light mode
    buttonBackground: '#F7E6CA', // Button background color for light mode
    buttonText: '#11181C', // Button text color for light mode
    cardBackground: '#FFF1E7', // Card background color for light mode
    socialButtonColor: '#007BFF', // Social button color
    highlight: '#FFDDC1', // New highlight color for light mode
    primary: '#F6DDF4', // New primary color for light mode
    secondary: '#65558F', // New secondary color for light mode
    danger: '#D32F2F', // New danger color for light mode
    success: '#388E3C', // New success color for light mode
    textInverted : 'white', // Inverted text color for light mode
  },
  dark: {
    text: '#ECEDEE', // Text color for dark mode
    background: '#151718', // Background color for dark mode
    tint: tintColorDark, // Tint color for dark mode
    icon: '#9BA1A6', // Icon color for dark mode
    tabIconDefault: '#9BA1A6', // Default tab icon color for dark mode
    tabIconSelected: tintColorDark, // Selected tab icon color for dark mode
    border: '#2D2F31', // Border color for dark mode
    inputBackground: '#1f1f1f', // Input background color for dark mode
    placeholder: '#757575', // Placeholder text color for dark mode
    inputBorder: '#444444', // Input border color for dark mode
    buttonBackground: '#2D2F31', // Button background color for dark mode
    buttonText: '#ECEDEE', // Button text color for dark mode
    cardBackground: '#2D2F31', // Card background color for dark mode (updated)
    socialButtonColor: '#007BFF', // Social button color for dark mode
    highlight: '#FFDDC1', // New highlight color for dark mode
    primary: '#65558F', // New primary color for dark mode
    secondary: '#FFAB91', // New secondary color for dark mode
    danger: '#D32F2F', // New danger color for dark mode
    success: '#388E3C', // New success color for dark mode
    textInverted : '#fff', // Inverted text color for dark mode
  },
};

export const Shadows = {
  light: shadowLight,
  dark: shadowDark,
};

export const Radius = borderRadius;
export const Spacing = spacing;
