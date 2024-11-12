import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        All Rights Reserved &copy; 2024{' '} 
      </p>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '10px',
  position: 'relative',
  bottom: '0',
  left: '0',
  width: '100%',
  fontSize: '14px',
  color: '#333',
};

const linkStyle: React.CSSProperties = {
  color: '#007bff', // Blue color for the link
  textDecoration: 'none', // Remove underline
};

