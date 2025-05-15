

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
  text: '#F5F5F5',               // Daha parlak, net yazı rengi
  background: '#121212',         // Gerçek koyu arkaplan (Google Material gibi)
  tint: '#f1c338',               // Tint aynı kalabilir (soft amber)
  icon: '#B0BEC5',               // Açık gri ikon (lightened)
  tabIconDefault: '#757575',     // Default tab ikonu için daha soft gri
  tabIconSelected: '#f1c338',    // Seçili tab ikonu için amber-gold
  border: '#2C2C2E',             // Apple Dark Border tonu (#2C2C2E)
  inputBackground: '#1E1E1E',    // Hafif açık ton input background
  placeholder: '#777777',         // Placeholder için yumuşak gri
  inputBorder: '#3A3A3C',        // Border için daha görünür koyu gri
  buttonBackground: '#2A2A2C',   // Button için koyu gri (Apple dark buton gibi)
  buttonText: '#F5F5F5',         // Kontrastlı beyaz metin
  cardBackground: '#1E1E1E',     // Kart arkaplanı, input ile aynı ton
  socialButtonColor: '#3B5998',  // Facebook blue (karanlıkta dengeli)
  highlight: '#3D3D3D',          // Hover/active highlight için soft dark tone
  primary: '#f1c338',            // Primary yine gold (çok yakışır koyuda)
  secondary: '#333333',          // Secondary elementler için soft dark gri
  danger: '#FF6B6B',             // Daha canlı danger (coral red gibi)
  success: '#4CAF50',            // Success için fresh green (Material Green)
  textInverted: '#000000',       // Light içerikler için ters renk siyah
  subtext: '#A0A0A0',            // Subtext için soft grey
  iconColorProfile: '#f1c338',   // Profil ikon rengi gold kalabilir
  logouticon: '#FF4C4C'          // Logout için daha dikkat çeken kırmızı
},
};

export const Shadows = {
  light: shadowLight,
  dark: shadowDark,
};

export const Radius = borderRadius;
export const Spacing = spacing;
