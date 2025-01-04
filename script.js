// script.js

// adjustTitleSize: ensures the title stays visible and properly sized
function adjustTitleSize() {
    // comment: select elements
    const title = document.querySelector('.main-title');
    const container = document.querySelector('.container-fluid');
    let fontSize = 15;
    
    // comment: set initial font size
    title.style.fontSize = fontSize + 'vw';
    
    // comment: shrink font if it's too big
    while (title.scrollWidth > container.offsetWidth * 0.9 && fontSize > 1) {
      fontSize -= 0.5;
      title.style.fontSize = fontSize + 'vw';
    }
  }
  
  // optional gradient function using chroma.js
  function applyExponentialGradient() {
    const overlay = document.querySelector('.gradient-overlay');
    if (!overlay) return;
    
    const steps = 50;
    const darkColor = chroma('#130f17');
    const lightColor = chroma('#f0f0f0');
    const colorStops = [];
    
    for (let i = 0; i <= steps; i++) {
      // example exponent of 2
      const t = Math.pow(i / steps, 2);
      colorStops.push(darkColor.mix(lightColor, t).css());
    }
    
    const gradientStr = `linear-gradient(to bottom, ${colorStops.join(', ')})`;
    overlay.style.background = gradientStr;
  }
  
  // run on load and on resize
  window.addEventListener('load', () => {
    adjustTitleSize();
    applyExponentialGradient(); // remove if you don't need it
  });
  window.addEventListener('resize', adjustTitleSize);
  