let textarea = document.querySelector('#textarea');
let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let selectedVoice = 0;

function populateVoicesList() {
  let voicesList = window.speechSynthesis.getVoices();
  console.log(voicesList);
  voices.innerHTML = ''; // Limpa a lista de vozes antes de preenchê-la novamente

  for (let i = 0; i < voicesList.length; i++) {
    let optionEl = document.createElement('option');
    optionEl.setAttribute('value', i);
    optionEl.innerText = voicesList[i].name;
    voices.appendChild(optionEl);
  }
}

function speakText() {
  if (textarea.value !== '') {
    let voicesList = window.speechSynthesis.getVoices();
    let ut = new SpeechSynthesisUtterance(textarea.value);
    ut.voice = voicesList[selectedVoice];
    window.speechSynthesis.speak(ut);
  }
}

button.addEventListener('click', speakText);

voices.addEventListener('change', () => {
  selectedVoice = parseInt(voices.value);
});

window.addEventListener('DOMContentLoaded', () => {
  // Aguarda o evento 'DOMContentLoaded' para garantir que a página esteja completamente carregada
  window.speechSynthesis.addEventListener('voiceschanged', populateVoicesList);
});

