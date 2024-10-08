let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsContainer = document.getElementById('laps');

// Function to format time as hh:mm:ss
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return (
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds
    );
}

// Start the stopwatch
startButton.addEventListener('click', function() {
    if (!isRunning) {
        startTime = Date.now() - difference;
        interval = setInterval(updateTime, 1000);
        isRunning = true;
    }
});

// Pause the stopwatch
pauseButton.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(interval);
        difference = Date.now() - startTime;
        isRunning = false;
    }
});

// Reset the stopwatch
resetButton.addEventListener('click', function() {
    clearInterval(interval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    isRunning = false;
    timeDisplay.innerText = '00:00:00';
    lapsContainer.innerHTML = '';
});

// Record a lap
lapButton.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = formatTime(difference);
        const lapDiv = document.createElement('div');
        lapDiv.className = 'lap';
        lapDiv.innerText = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapDiv);
    }
});

// Update the stopwatch display
function updateTime() {
    updatedTime = Date.now() - startTime;
    difference = updatedTime;
    timeDisplay.innerText = formatTime(updatedTime);
}

