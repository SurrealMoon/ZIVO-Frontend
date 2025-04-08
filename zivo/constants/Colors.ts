const tintColorLight = '#FFF1E7';
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
    text: '#11181C',
    background: '#FFF1E7',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#E5E7EB',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#2D2F31', // ✅ eklendi (gri tonlu koyu kenarlık)
  },
};

export const Shadows = {
  light: shadowLight,
  dark: shadowDark,
};

export const Radius = borderRadius;
export const Spacing = spacing;
