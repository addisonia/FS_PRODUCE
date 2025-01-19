// script.js

// adjustTitleSize: ensures the hero title is properly sized
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


// make sure the link and the album scroller exist
const arrowLink = document.querySelector('.scroll-down-link');
if (arrowLink) {
  arrowLink.addEventListener('click', (e) => {
    // prevent normal jump
    e.preventDefault();
    
    // find the album scroller
    const scroller = document.querySelector('.album-scroller');
    if (!scroller) return;
    
    // get its bounding rectangle
    const rect = scroller.getBoundingClientRect();
    // figure out the vertical midpoint of .album-scroller
    const midpoint = rect.top + window.pageYOffset - (window.innerHeight / 2) + (rect.height / 2);

    // smoothly scroll to that position
    window.scrollTo({
      top: midpoint,
      behavior: 'smooth'
    });
  });
}



//*********************************************************\\

// optional function using chroma.js for gradient
function applyExponentialGradient() {
  const overlay = document.querySelector('.gradient-overlay');
  if (!overlay) return;
  
  const steps = 50;
  const darkColor = chroma('#130f17');
  const lightColor = chroma('#f0f0f0');
  const colorStops = [];
  
  for (let i = 0; i <= steps; i++) {
    const t = Math.pow(i / steps, 2);
    colorStops.push(darkColor.mix(lightColor, t).css());
  }
  
  const gradientStr = `linear-gradient(to bottom, ${colorStops.join(', ')})`;
  overlay.style.background = gradientStr;
}

// random polygon clip-path generator
function randomPolygon() {
  const numPoints = 100; 
  const topPoints = [];
  const bottomPoints = [];

  for (let i = 0; i < numPoints; i++) {
    const x = Math.round((i / (numPoints - 1)) * 100);
    const yTop = Math.floor(Math.random() * 30);
    const yBottom = 80 + Math.floor(Math.random() * 20);

    topPoints.push(`${x}% ${yTop + (Math.random() * 10)}%`);
    bottomPoints.push(`${x}% ${yBottom}%`);
  }

  bottomPoints.reverse();
  const points = [...topPoints, ...bottomPoints];

  return `polygon(${points.join(', ')})`;
}

function applyRandomWave(waveElement) {
  const speed = (Math.random() * 2 + 6).toFixed(1);
  document.documentElement.style.setProperty('--wave-speed', speed + 's');
  
  const clipPath = randomPolygon();
  waveElement.style.clipPath = clipPath;
}

function randomizeWaves() {
  // find all .wave elements
  const allWaves = document.querySelectorAll('.wave');
  
  // apply random polygon to each wave
  allWaves.forEach(wave => {
    applyRandomWave(wave);
  });
  
  // pair up wave2 with wave1 in top, and wave2 with wave1 in bottom
  const waveTop1 = document.querySelector('.wave.wave-top:not(.wave2)');
  const waveTop2 = document.querySelector('.wave.wave2.wave-top');
  if (waveTop1 && waveTop2) {
    waveTop2.style.animationDuration = getComputedStyle(waveTop1).animationDuration;
  }
  
  const waveBottom1 = document.querySelector('.wave.wave-bottom:not(.wave2)');
  const waveBottom2 = document.querySelector('.wave.wave2.wave-bottom');
  if (waveBottom1 && waveBottom2) {
    waveBottom2.style.animationDuration = getComputedStyle(waveBottom1).animationDuration;
  }
}

// run once on load
window.addEventListener('load', () => {
  randomizeWaves();
});

// if you want new random waves every 10000ms, uncomment:
// setInterval(randomizeWaves, 10000);

// run on load and on resize
window.addEventListener('load', () => {
  adjustTitleSize();
  applyExponentialGradient(); // if you want the gradient
});
window.addEventListener('resize', adjustTitleSize);
