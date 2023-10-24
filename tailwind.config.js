const sizes = generateSizes(0, 2000);
const degrees = generateDegrees(-360, 360);


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: sizes,
      spacing: sizes,
      minWidth: sizes,
      minHeight: sizes,
      maxWidth: sizes,
      lineHeight: sizes,
      borderWidth: sizes,
      borderRadius: sizes,
      rotate: degrees,
      skew: degrees,
      zIndex: {
        '-10': '-10',
        '-1': '-1',
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '98': '98',
        '99': '99',
      }
    },
  },
  plugins: [],
}

/**
 * Utilities
 */
function pxtorem(i, base = 16) {
  return (i / base).toFixed(3);
}

function generateSizes(pxmin = 0, pxmax = 100) {
  const sizes = {
    initial: 'initial',
    inherit: 'inherit',
  };
  for (let i = pxmin; i <= pxmax; i++) {
    sizes[i] = pxtorem(i) + 'rem';
  }
  return sizes;
}

function generateDegrees(degMin = -360, degMax = 360) {
  const degrees = {};
  for (let i = degMin; i <= degMax; i++) {
    degrees[i] = i + 'deg';
  }
  return degrees;
}


