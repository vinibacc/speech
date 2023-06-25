let textarea = document.querySelector('#textarea');
let voices = document.querySelector('#voices');
let playPauseButton = document.querySelector('#playPauseButton');
let stopButton = document.querySelector('#stopButton');
let selectedVoice = 0;
let utterance = null;

function populateVoicesList() {
  let voicesList = window.speechSynthesis.getVoices();
  voices.innerHTML = '';

  for (let i = 0; i < voicesList.length; i++) {
    let optionEl = document.createElement('option');
    optionEl.setAttribute('value', i);
    optionEl.innerText = voicesList[i].name;
    voices.appendChild(optionEl);
  }
}

function togglePlayPause() {
  if (utterance !== null) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      playPauseButton.innerHTML = "<i class='bi bi-pause'></i>";
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      playPauseButton.innerHTML = "<i class='bi bi-play'></i>";
    }
  } else {
    speakText();
  }
}

function speakText() {
  if (textarea.value !== '') {
    let voicesList = window.speechSynthesis.getVoices();
    utterance = new SpeechSynthesisUtterance(textarea.value);
    utterance.voice = voicesList[selectedVoice];
    window.speechSynthesis.speak(utterance);
    playPauseButton.innerHTML = "<i class='bi bi-pause'></i>";
  }
}

function stopSpeech() {
  if (utterance !== null) {
    window.speechSynthesis.cancel();
    utterance = null;
    playPauseButton.innerHTML = "<i class='bi bi-play'></i>";
  }
}

playPauseButton.addEventListener('click', togglePlayPause);
stopButton.addEventListener('click', stopSpeech);

voices.addEventListener('change', () => {
  selectedVoice = parseInt(voices.value);
});

window.addEventListener('DOMContentLoaded', () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.addEventListener('voiceschanged', populateVoicesList);
  } else {
    console.log('API de síntese de fala não suportada');
  }
});