/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// const player = document.querySelector('.player');
// const video = player.querySelector('.viewer');
// const progress = player.querySelector('.progress');
// const progressFilled = player.querySelector('.progress__filled');
// const toggleButton = player.querySelector('.toggle');
// const volumeSlider = player.querySelector('input[name="volume"]');
// const playbackRateSlider = player.querySelector('input[name="playbackRate"]');
// const skipButtons = player.querySelectorAll('[data-skip]');

// Function to toggle play/pause of the video
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Function to update the play/pause button icon
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Function to handle volume change
function handleVolumeChange() {
  video.volume = volumeSlider.value;
}

// Function to handle playback speed change
function handlePlaybackRateChange() {
  video.playbackRate = playbackRateSlider.value;
}

// Function to skip forward or backward
function skip() {
  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

// Function to update the progress bar
function handleProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${progressPercentage}%`;
}

// Function to handle seeking when clicked on the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggleButton.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackRateSlider.addEventListener('input', handlePlaybackRateChange);
skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
