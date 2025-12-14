import React from 'react';

const UniversalLoader = ({ size = 64 }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: size,
    minWidth: size,
    background: 'rgba(0,0,0,0.7)',
  }}>
    <img
      src="/public/loader.gif"
      alt="Loading..."
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  </div>
);

export default UniversalLoader;
