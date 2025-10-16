const raiderText = document.getElementById("raiderText");
const phrases = ["Red Raiders", "Dead Raiders"];
let index = 0;

setInterval(() => {
  raiderText.classList.add("glitching");
  setTimeout(() => {
    index = (index + 1) % phrases.length;
    const nextPhrase = phrases[index];
    raiderText.textContent = nextPhrase;
    raiderText.dataset.shadow = nextPhrase;
  }, 200);
  setTimeout(() => {
    raiderText.classList.remove("glitching");
  }, 800);
}, 3600);

const body = document.body;
function summonLightning() {
  if (Math.random() > 0.75) {
    body.classList.add("lightning");
    setTimeout(() => body.classList.remove("lightning"), 900);
  }
}
setInterval(summonLightning, 7000);

function dripBlood() {
  const drop = document.createElement("span");
  drop.className = "blood-drop";
  drop.style.left = Math.random() * 100 + "vw";
  drop.style.animationDuration = 3.5 + Math.random() * 1.8 + "s";
  document.body.appendChild(drop);
  setTimeout(() => drop.remove(), 5200);
}
setInterval(dripBlood, 3600);

speechSynthesis.onvoiceschanged = speakText;

function speakText() {
  const text = "The final bell rang years ago, but the screams never stopped. Now the halls call for new souls. Will you answer?";
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(voice => voice.name.toLowerCase().includes('male') && voice.lang.startsWith('en')) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
  utterance.pitch = 0.3;
  utterance.rate = 0.6;
  utterance.volume = 1;

  const subtitle = document.querySelector('.hero-subtitle');
  subtitle.textContent = '';

  utterance.onboundary = (event) => {
    subtitle.textContent = text.substring(0, event.charIndex + 1);
  };

  utterance.onend = () => {
    subtitle.textContent = text;
  };

  speechSynthesis.speak(utterance);
}

document.querySelector('.moon img').addEventListener('click', () => {
  if (speechSynthesis.getVoices().length > 0) {
    speakText();
  } else {
    speechSynthesis.onvoiceschanged = speakText;
  }
});