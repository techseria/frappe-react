const chroma = require('chroma-js')

function generateColorPalette() {
  const colors = {
    gray: {
      1: '#F8F8F8',
      2: '#F0F0F0',
      3: '#E8E8E8',
      4: '#E0E0E0',
      5: '#D8D8D8',
      6: '#D0D0D0',
      7: '#C8C8C8',
      8: '#C0C0C0',
      9: '#B8B8B8',
      10: '#B0B0B0',
      11: '#A8A8A8',
      12: '#A0A0A0',
      13: '#989898',
      14: '#909090',
      15: '#888888',
      16: '#808080',
      17: '#787878',
      18: '#707070',
      19: '#686868',
      20: '#606060',
      21: '#585858',
      22: '#505050',
      23: '#484848',
      24: '#404040',
      25: '#383838',
      26: '#303030',
      27: '#282828',
      28: '#202020',
      29: '#181818',
      30: '#101010',
    },
    blue: {
      1: '#E6F0FF',
      2: '#CCE0FF',
      3: '#B3D1FF',
      4: '#99C1FF',
      5: '#80B2FF',
      6: '#66A3FF',
      7: '#4D93FF',
      8: '#3384FF',
      9: '#1A75FF',
      10: '#0065FF',
      11: '#005CE6',
      12: '#0052CC',
      13: '#0049B3',
      14: '#004099',
      15: '#003680',
      16: '#002D66',
      17: '#00234D',
      18: '#001A33',
      19: '#00111A',
      20: '#00080D',
    },
    // Additional color scales (red, green, yellow, etc.) would go here
  }

  return colors
}

function generateSemanticColors() {
  return {
    ink: {
      gray: {
        1: 'var(--ink-gray-1)',
        2: 'var(--ink-gray-2)',
        3: 'var(--ink-gray-3)',
        4: 'var(--ink-gray-4)',
        5: 'var(--ink-gray-5)',
        6: 'var(--ink-gray-6)',
        7: 'var(--ink-gray-7)',
        8: 'var(--ink-gray-8)',
        9: 'var(--ink-gray-9)',
      },
      blue: {
        1: 'var(--ink-blue-1)',
        2: 'var(--ink-blue-2)',
        3: 'var(--ink-blue-3)',
        4: 'var(--ink-blue-4)',
        5: 'var(--ink-blue-5)',
      },
      // Other semantic ink colors
    },
    surface: {
      gray: {
        1: 'var(--surface-gray-1)',
        2: 'var(--surface-gray-2)',
        3: 'var(--surface-gray-3)',
        4: 'var(--surface-gray-4)',
        5: 'var(--surface-gray-5)',
      },
      blue: {
        1: 'var(--surface-blue-1)',
        2: 'var(--surface-blue-2)',
      },
      // Other semantic surface colors
    },
    outline: {
      gray: {
        1: 'var(--outline-gray-1)',
        2: 'var(--outline-gray-2)',
        3: 'var(--outline-gray-3)',
        4: 'var(--outline-gray-4)',
      },
      // Other semantic outline colors
    },
  }
}

function generateCSSVariables() {
  const colorPalette = generateColorPalette()
  const cssVariables = {}

  // Generate ink variables
  for (const [colorName, shades] of Object.entries(colorPalette)) {
    for (const [shade, value] of Object.entries(shades)) {
      cssVariables[`--ink-${colorName}-${shade}`] = value
    }
  }

  // Generate surface variables (lighter variants)
  for (const [colorName, shades] of Object.entries(colorPalette)) {
    for (const [shade, value] of Object.entries(shades)) {
      if (shade <= 5) {
        cssVariables[`--surface-${colorName}-${shade}`] = chroma(value).brighten(0.8).hex()
      }
    }
  }

  // Generate outline variables (darker variants)
  for (const [colorName, shades] of Object.entries(colorPalette)) {
    for (const [shade, value] of Object.entries(shades)) {
      if (shade >= 15) {
        cssVariables[`--outline-${colorName}-${shade-14}`] = chroma(value).darken(0.2).hex()
      }
    }
  }

  return cssVariables
}

module.exports = {
  generateColorPalette,
  generateSemanticColors,
  generateCSSVariables,
}
