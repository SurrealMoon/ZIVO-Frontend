

const tintColorLight = '#fff7ed';
const tintColorDark = '#fff';

const shadowLight = '0px 2px 4px rgba(0, 0, 0, 0.3)';
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
    background: 'white', // Background color for light mode
    tint: tintColorLight, // Tint color for light mode
    icon: '#687076', // Icon color for light mode
    tabIconDefault: '#687076', // Default tab icon color for light mode
    tabIconSelected: tintColorLight, // Selected tab icon color for light mode
    border: '#E5E7EB', // Border color for light mode
    inputBackground: '#FAFAFA', // Input background color for light mode
    placeholder: '#a3a3a3', // Placeholder text color for light mode
    inputBorder: '#E5E7EB', // Input border color for light mode
    buttonBackground: '#f1c338', // Button background color for light mode #F7E6CA before
    buttonText: '#11181C', // Button text color for light mode
    cardBackground: 'black', // Card background color for light mode #FFFAFA before
    socialButtonColor: '#007BFF', // Social button color
    highlight: '#FFDDC1', // New highlight color for light mode
    primary: '#f1c338', // New primary color for light mode
    secondary: '#FAFAFA', // New secondary color for light mode
    danger: '#D32F2F', // New danger color for light mode
    success: '#388E3C', // New success color for light mode
    textInverted : 'black', // Inverted text color for light mode
    subtext: '#6B7280', // Subtext color for light mode
    iconColorProfile: '#f1c338', // Icon color for profile screen
    logouticon: 'red'
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
    subtext: '#B0BEC5', // Subtext color for dark mode
    iconColorProfile: '#ECEDEE', // Icon color for profile screen
    logouticon: 'red'
  },
};

export const Shadows = {
  light: shadowLight,
  dark: shadowDark,
};

export const Radius = borderRadius;
export const Spacing = spacing;
