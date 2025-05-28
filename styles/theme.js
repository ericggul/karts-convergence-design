export const theme = {
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#f5f5f5',
    border: 'rgba(255, 255, 255, 0.2)',
    overlay: 'rgba(0, 0, 0, 0.8)'
  },
  typography: {
    primary: 'Arial, Helvetica, sans-serif',
    sizes: {
      small: '0.875rem',
      base: '1rem',
      medium: '1.125rem',
      large: '1.5rem',
      xl: '2rem',
      xxl: '2.5rem'
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  grid: {
    desktop: '33.333vw',
    mobile: '50vw',
    gap: '3px'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  transitions: {
    fast: '0.2s ease-out',
    medium: '0.3s ease-out',
    slow: '0.5s ease-out'
  },
  zIndex: {
    base: 0,
    overlay: 10,
    modal: 100,
    tooltip: 1000
  }
}; 