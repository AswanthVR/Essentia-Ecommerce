// FontUtility.js

import React from 'react'; 

const applyLexendFont = () => {
  const style = {
    fontFamily: 'Lexend, sans-serif',
  };

  return (
    <style>
      {`
        body {
            @apply font-lexend;
        }
      `}
    </style>
  );
};

export default applyLexendFont;
