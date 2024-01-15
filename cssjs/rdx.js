// nav bar slider code //

   let isSidebarOpen = false;
let touchStartX, touchMoveX;

function toggleMenu() {
  const nav = document.querySelector('nav'); // Adjust the selector based on your HTML structure

  if (isSidebarOpen) {
    nav.style.left = '-250px';
  } else {
    nav.style.left = '0';
  }

  isSidebarOpen = !isSidebarOpen;
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  touchMoveX = e.touches[0].clientX;
}

function handleTouchEnd() {
  const diffX = touchStartX - touchMoveX;

  if (Math.abs(diffX) > 50 && isSidebarOpen) {
    toggleMenu();
  }
}

document.addEventListener('click', function (e) {
  const targetElement = e.target;

  if (targetElement && targetElement.id === 'menuButton') { // Adjust 'menuButton' to the actual ID or class of your menu button
    toggleMenu();
  }
});

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
 
 
 
    // img slider code //
  
   document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector(".slider");
    let count = 1;
   
    function slide() {
     count++;
     if (count > 3) {
      count = 1;
     }
     slider.style.transform = `translateX(${-100 * (count - 1)}%)`;
    }
   
    setInterval(slide, 3000); // Change slide every 3 seconds
   });
    
    
    
 
    
        // countdown timer code //
    
    function startCountdown(initialDuration) {
    const timerDisplay = document.getElementById('timerDisplay');
    let countdownInterval;

    function resetCountdown() {
        clearInterval(countdownInterval);
        localStorage.removeItem('countdownTimestamp');
        startCountdown(initialDuration);
    }

    const storedTimestamp = localStorage.getItem('countdownTimestamp');
    const currentTime = Math.floor(Date.now() / 1000);
    let durationInSeconds;

    if (storedTimestamp) {
        const elapsedSeconds = currentTime - storedTimestamp;
        durationInSeconds = initialDuration - elapsedSeconds;

        if (durationInSeconds <= 0) {
            resetCountdown();
            return;
        }
    } else {
        durationInSeconds = initialDuration;
        localStorage.setItem('countdownTimestamp', currentTime);
    }

    countdownInterval = setInterval(() => {
        durationInSeconds--;

        if (durationInSeconds < 0) {
            resetCountdown();
            return;
        }

        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        const countdownText = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

        timerDisplay.innerText = countdownText;
    }, 1000);
}

const initialDuration = 15 * 60 * 60 + 59 * 60 + 59;
startCountdown(initialDuration);
    
    
    
    
    
    // loding line headr line //
    
        function init() {
  // Add click event listener to all buttons
  var buttons = document.querySelectorAll('button, a');
  buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      // Prevent the default behavior of the link
      event.preventDefault();

      // Change the loading line style on button click
      var loadingLine = document.getElementById('loadingLine');
      loadingLine.style.backgroundColor = 'red';
      loadingLine.style.animation = 'loadingAnimation 2s linear forwards'; // Set the animation duration to 4 seconds

      // Retrieve the link from the clicked button
      var link = button.getAttribute('href');

      // Open the link after the loading animation completes
      setTimeout(function () {
        // Remove the loading styles
        loadingLine.style.backgroundColor = '';
        loadingLine.style.animation = '';

        // Open the link
        window.location.href = link;
      }, 1000); // 2000 milliseconds = 2 seconds
    });
  });

  // Existing code...

  // Function to toggle the menu (assuming it's already defined)
  function toggleMenu() {
    // Existing code...
  }

  // Additional JavaScript functions...

  // Add a loading animation style
  var style = document.createElement('style');
  style.innerHTML = `
    @keyframes loadingAnimation {
      0% { width: 0; }
      100% { width: 100%; }
    }
  `;
  document.head.appendChild(style);
}



// text and img copy block
