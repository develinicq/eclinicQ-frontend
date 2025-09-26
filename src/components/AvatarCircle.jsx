import React from 'react';

// Size tokens: L(48px), MD(40px), S(32px), XS(24px)
const sizeMap = {
  l: 'w-12 h-12 text-xl', // 48px
  md: 'w-10 h-10 text-lg', // 40px
  s: 'w-8 h-8 text-base', // 32px
  xs: 'w-6 h-6 text-sm', // 24px
};

// Color tokens from specs
// blue: bg #F8FAFF, border #96BFFF
// orange: bg #FFF7F0, border #EC7600
// grey: bg #F9F9F9, border #D6D6D6
const colorTokens = {
  blue: { bg: '#F8FAFF', border: '#96BFFF', text: '#2563EB' },
  orange: { bg: '#FFF7F0', border: '#EC7600', text: '#EC7600' },
  grey: { bg: '#F9F9F9', border: '#D6D6D6', text: '#6B7280' },
};

/**
 * AvatarCircle
 * @param {string} name - The name to display (first letter used)
 * @param {'l'|'md'|'s'|'xs'} [size]
 * @param {'blue'|'orange'|'grey'} [color]
 * @param {string} [className]
 */
const AvatarCircle = ({ name, size = 'md', color = 'blue', className = '' }) => {
  const initial = name?.[0]?.toUpperCase() || '?';
  const sz = sizeMap[size] || sizeMap.md;
  const { bg, border, text } = colorTokens[color] || colorTokens.blue;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-base ${sz} ${className}`}
      style={{
        backgroundColor: bg,
        color: text,
        borderColor: border,
        borderStyle: 'solid',
        borderWidth: '1px', // approximates 0.5px across displays
      }}
    >
      {initial}
    </span>
  );
};

export default AvatarCircle;
