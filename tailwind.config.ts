import daisyui from 'daisyui';

const config = {
  theme: {
    extend: {
      fontFamily: {
        jungle: ['Jungle Adventure', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        monospace: ['Courier New', 'monospace'],
      },
      colors: {
        bg1: '#278550',
      }
    },
  },
  plugins: [daisyui],
};

export default config;
