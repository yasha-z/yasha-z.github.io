// Reveal sections with animation on scroll
const sections = document.querySelectorAll('section');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.classList.add('visible');
    }
  });
};

// Make sure to reveal all sections on initial page load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  // Force all sections to be visible on page load
  sections.forEach(section => {
    section.classList.add('visible');
  });
  revealOnScroll();
});

// Matrix digital rain effect on canvas
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width, height;
const letters = '0123456789ABCDEF'.split('');
let fontSize = 18;
let columns;

const drops = [];

function init() {
  resizeCanvas();
  for (let x = 0; x < columns; x++) drops[x] = Math.random() * height;
  requestAnimationFrame(draw);
}

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  columns = Math.floor(width / fontSize);
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0ff'; // neon cyan
  ctx.font = fontSize + 'px monospace';
  drops.forEach((y, x) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);
    drops[x] = y * fontSize > height && Math.random() > 0.975 ? 0 : drops[x] + 1;
  });

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  for (let x = 0; x < columns; x++) drops[x] = Math.random() * height;
});

init();

// Password Cracker Game Logic
document.addEventListener('DOMContentLoaded', function() {
  const passwordDigits = document.querySelectorAll('.password-digit');
  const checkButton = document.getElementById('check-password');
  const feedback = document.getElementById('password-feedback');
  const secretContent = document.getElementById('secret-content');
  
  // The correct password is 6307 (based on the hints)
  const correctPassword = '6307';
  
  // Add focus navigation between inputs
  passwordDigits.forEach((digit, index) => {
    digit.addEventListener('input', function() {
      if (this.value !== '' && index < passwordDigits.length - 1) {
        passwordDigits[index + 1].focus();
      }
    });
    
    // Allow backspace to go to previous input
    digit.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && this.value === '' && index > 0) {
        passwordDigits[index - 1].focus();
      }
    });
  });
  
  // Check password on button click
  checkButton.addEventListener('click', function() {
    const enteredPassword = Array.from(passwordDigits)
      .map(input => input.value)
      .join('');
    
    if (enteredPassword === correctPassword) {
      feedback.textContent = 'ACCESS GRANTED!';
      feedback.style.color = 'var(--neon-green)';
      secretContent.style.display = 'block';
      
      // Add success animation
      passwordDigits.forEach(digit => {
        digit.style.borderColor = 'var(--neon-green)';
        digit.style.boxShadow = '0 0 15px var(--neon-green)';
        digit.style.color = 'var(--neon-green)';
      });
    } else {
      // Check how many digits are correct
      let correctDigits = 0;
      for (let i = 0; i < 4; i++) {
        if (enteredPassword[i] === correctPassword[i]) {
          correctDigits++;
        }
      }
      
      feedback.textContent = `Access denied! ${correctDigits}/4 digits correct`;
      feedback.style.color = 'var(--neon-pink)';
      
      // Error animation
      passwordDigits.forEach(digit => {
        digit.style.borderColor = 'var(--neon-pink)';
        digit.style.boxShadow = '0 0 15px var(--neon-pink)';
      });
      
      setTimeout(() => {
        passwordDigits.forEach(digit => {
          digit.style.borderColor = 'var(--neon-blue)';
          digit.style.boxShadow = '0 0 10px var(--neon-blue)';
        });
      }, 1000);
    }
  });
});

// Neural Network Simulation Logic
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  const trainButton = document.getElementById('train-network');
  const predictButton = document.getElementById('run-prediction');
  
  // Parameters and displays
  const learningRateSlider = document.getElementById('learning-rate');
  const learningRateValue = document.getElementById('learning-rate-value');
  const hiddenNeuronsSlider = document.getElementById('hidden-neurons');
  const hiddenNeuronsValue = document.getElementById('hidden-neurons-value');
  const epochsSlider = document.getElementById('epochs');
  const epochsValue = document.getElementById('epochs-value');
  
  // Metrics displays
  const accuracyDisplay = document.getElementById('accuracy');
  const lossDisplay = document.getElementById('loss');
  const predictionResult = document.getElementById('prediction-result');
  
  // Create input grid for testing
  const inputGrid = document.getElementById('input-grid');
  const gridSize = 5;
  let inputData = Array(gridSize * gridSize).fill(0);
  
  // Create grid cells
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    cell.addEventListener('click', function() {
      this.classList.toggle('active');
      inputData[i] = this.classList.contains('active') ? 1 : 0;
    });
    inputGrid.appendChild(cell);
  }
  
  // Update parameter displays
  learningRateSlider.addEventListener('input', function() {
    learningRateValue.textContent = (this.value / 10).toFixed(1);
  });
  
  hiddenNeuronsSlider.addEventListener('input', function() {
    hiddenNeuronsValue.textContent = this.value;
  });
  
  epochsSlider.addEventListener('input', function() {
    epochsValue.textContent = this.value;
  });
  
  // Initialize with default values
  learningRateValue.textContent = (learningRateSlider.value / 10).toFixed(1);
  hiddenNeuronsValue.textContent = hiddenNeuronsSlider.value;
  epochsValue.textContent = epochsSlider.value;
  
  // Neural network visualization
  function drawNeuralNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const hiddenNeurons = parseInt(hiddenNeuronsValue.textContent);
    
    // Network layers positioning
    const inputLayerX = 50;
    const hiddenLayerX = canvas.width / 2;
    const outputLayerX = canvas.width - 50;
    
    // Draw connections first (behind neurons)
    ctx.strokeStyle = 'rgba(24, 255, 241, 0.2)';
    ctx.lineWidth = 1;
    
    // Input to hidden connections
    for (let i = 0; i < 5; i++) { // Input neurons (simplified)
      const inputY = 60 + i * 45;
      
      for (let h = 0; h < hiddenNeurons; h++) {
        const hiddenY = 60 + h * (180 / (hiddenNeurons - 1));
        
        ctx.beginPath();
        ctx.moveTo(inputLayerX, inputY);
        ctx.lineTo(hiddenLayerX, hiddenY);
        ctx.stroke();
      }
    }
    
    // Hidden to output connections
    for (let h = 0; h < hiddenNeurons; h++) {
      const hiddenY = 60 + h * (180 / (hiddenNeurons - 1));
      
      for (let o = 0; o < 3; o++) { // Output neurons (simplified)
        const outputY = 100 + o * 50;
        
        ctx.beginPath();
        ctx.moveTo(hiddenLayerX, hiddenY);
        ctx.lineTo(outputLayerX, outputY);
        ctx.stroke();
      }
    }
    
    // Draw neurons
    function drawNeuron(x, y, color, size = 15) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    
    // Input neurons
    for (let i = 0; i < 5; i++) {
      drawNeuron(inputLayerX, 60 + i * 45, 'var(--neon-pink)');
    }
    
    // Hidden neurons
    for (let h = 0; h < hiddenNeurons; h++) {
      drawNeuron(hiddenLayerX, 60 + h * (180 / (hiddenNeurons - 1)), 'var(--neon-green)');
    }
    
    // Output neurons
    for (let o = 0; o < 3; o++) {
      drawNeuron(outputLayerX, 100 + o * 50, 'var(--neon-yellow)');
    }
    
    // Labels
    ctx.fillStyle = 'var(--neon-blue)';
    ctx.font = '14px "Share Tech Mono"';
    ctx.textAlign = 'center';
    ctx.fillText('INPUT', inputLayerX, 30);
    ctx.fillText('HIDDEN', hiddenLayerX, 30);
    ctx.fillText('OUTPUT', outputLayerX, 30);
  }
  
  // Draw initial network
  drawNeuralNetwork();
  
  // Redraw network when hidden neurons change
  hiddenNeuronsSlider.addEventListener('input', drawNeuralNetwork);
  
  // Training animation
  let isTraining = false;
  let currentEpoch = 0;
  let trainingInterval;
  
  trainButton.addEventListener('click', function() {
    if (isTraining) return;
    
    const epochs = parseInt(epochsSlider.value);
    const learningRate = parseFloat(learningRateValue.textContent);
    
    isTraining = true;
    currentEpoch = 0;
    trainButton.disabled = true;
    trainButton.textContent = 'TRAINING...';
    
    // Simulated training progress
    trainingInterval = setInterval(() => {
      currentEpoch++;
      
      // Update metrics with simulated values
      const progress = currentEpoch / epochs;
      const simulatedAccuracy = Math.min(0.98, 0.40 + progress * 0.58);
      const simulatedLoss = Math.max(0.02, 1.0 - progress * 0.98);
      
      accuracyDisplay.textContent = `${(simulatedAccuracy * 100).toFixed(1)}%`;
      lossDisplay.textContent = simulatedLoss.toFixed(2);
      
      // Visualize neurons activating during training
      drawNeuralNetwork();
      
      // Pulse animation on random neurons
      const randomHiddenNeuron = Math.floor(Math.random() * parseInt(hiddenNeuronsValue.textContent));
      const hiddenY = 60 + randomHiddenNeuron * (180 / (parseInt(hiddenNeuronsValue.textContent) - 1));
      
      ctx.beginPath();
      ctx.arc(canvas.width/2, hiddenY, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 132, 0.3)';
      ctx.fill();
      
      if (currentEpoch >= epochs) {
        clearInterval(trainingInterval);
        isTraining = false;
        trainButton.disabled = false;
        trainButton.textContent = 'TRAIN NETWORK';
        
        // Final network after training
        drawNeuralNetwork();
      }
    }, 100);
  });
  
  // Prediction functionality
  predictButton.addEventListener('click', function() {
    // Check if there's input data (cells selected)
    const hasInput = inputData.some(value => value === 1);
    
    if (!hasInput) {
      predictionResult.textContent = "No input data!";
      return;
    }
    
    // Animation for prediction
    let flashCount = 0;
    const animateInterval = setInterval(() => {
      flashCount++;
      drawNeuralNetwork();
      
      // Highlight active input cells
      ctx.fillStyle = 'var(--neon-green)';
      for (let i = 0; i < inputData.length; i++) {
        if (inputData[i] === 1) {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          // Map to input neurons (simplified)
          if (row % 2 === 0) {
            ctx.beginPath();
            ctx.arc(50, 60 + col * 45, 15, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      if (flashCount > 5) {
        clearInterval(animateInterval);
        
        // Determine result based on pattern (simplified logic)
        const activeCells = inputData.filter(v => v === 1).length;
        let result;
        
        if (activeCells < 8) {
          result = "Triangle";
        } else if (activeCells < 15) {
          result = "Square";
        } else {
          result = "Circle";
        }
        
        predictionResult.textContent = result;
      }
    }, 100);
  });
});

