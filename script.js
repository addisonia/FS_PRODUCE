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


  
// script.js

// random polygon clip-path generator
function randomPolygon() {
    const numPoints = 100; // fewer points for simplicity
    const topPoints = [];
    const bottomPoints = [];
  
    for (let i = 0; i < numPoints; i++) {
      const x = Math.round((i / (numPoints - 1)) * 100);
      const yTop = Math.floor(Math.random() * 30); // 0%-20% range
      const yBottom = 80 + Math.floor(Math.random() * 20); // 80%-100% range
  
      topPoints.push(`${x}% ${yTop + (Math.random() * 10)}%`);
      bottomPoints.push(`${x}% ${yBottom}%`);
    }
  
    // bottomPoints in reverse to connect properly
    bottomPoints.reverse();
  
    // combine top + reversed bottom into one shape
    const points = [...topPoints, ...bottomPoints];
  
    return `polygon(${points.join(', ')})`;
  }
  
  
  function applyRandomWave(waveElement) {
    // random duration between 6s and 12s
    const speed = (Math.random() * 2 + 6).toFixed(1);
    document.documentElement.style.setProperty('--wave-speed', speed + 's');
  
    // random clip-path
    const clipPath = randomPolygon();
    waveElement.style.clipPath = clipPath;
  }
  
  function randomizeWaves() {
    const wave1 = document.querySelector('.wave');
    const wave2 = document.querySelector('.wave2');
  
    if (!wave1 || !wave2) return;
  
    // give wave1 its random shape and speed
    applyRandomWave(wave1);
  
    // wave2 will share the same speed but can have its own shape
    wave2.style.animationDuration = getComputedStyle(wave1).animationDuration;
    wave2.style.clipPath = randomPolygon();
  }
  
  // run once on load
  window.addEventListener('load', () => {
    randomizeWaves();
  });
  
  // if you want new random waves every so often, uncomment this:
  setInterval(randomizeWaves, 100000); // new shape & speed every 10s
  

  
  

  
  
  // run on load and on resize
  window.addEventListener('load', () => {
    adjustTitleSize();
    applyExponentialGradient(); // remove if you don't need it
  });
  window.addEventListener('resize', adjustTitleSize);
  