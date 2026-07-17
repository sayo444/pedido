const heartsBg = document.getElementById('heartsBg');
const heartSVG = (size, color) => `
  <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-7.5-4.6-10.2-9.1C-0.1 8.6 1.4 4.8 5 3.8c2.2-0.6 4.4 0.3 5.6 2.1a1 1 0 0 0 1.8 0c1.2-1.8 3.4-2.7 5.6-2.1 3.6 1 5.1 4.8 3.2 8.1C19.5 16.4 12 21 12 21z" fill="${color}"/>
  </svg>`;

const colors = ['#f6c9cd', '#e08c95', '#d8ad7a', '#f2b3ba'];

function spawnHeart(){
  const el = document.createElement('div');
  el.className = 'bg-heart';
  const size = 14 + Math.random()*22;
  const left = Math.random()*100;
  const duration = 9 + Math.random()*8;
  const drift = (Math.random()*80 - 40) + 'px';
  const color = colors[Math.floor(Math.random()*colors.length)];
  el.style.left = left + 'vw';
  el.style.setProperty('--drift', drift);
  el.style.animationDuration = duration + 's';
  el.innerHTML = heartSVG(size, color);
  heartsBg.appendChild(el);
  setTimeout(()=> el.remove(), duration*1000 + 500);
}

for(let i=0;i<10;i++){
  setTimeout(()=> spawnHeart(), i*400);
}
setInterval(spawnHeart, 900);

const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const buttonsWrap = document.querySelector('.buttons');
const yesCounter = document.getElementById('yesCounter');
const noMessages = [
  'Não', 'Tem certeza?', 'Pensa bem...', 'Última chance!',
  'É sério isso?', 'Vai negar o amor?', 'Só clica no Sim 🥺'
];
let noTries = 0;

function moveNoButton(){
  const wrapRect = buttonsWrap.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - 24;
  const maxY = window.innerHeight - btnRect.height - 24;
  const x = Math.max(24, Math.random()*maxX);
  const y = Math.max(24, Math.random()*maxY);
  btnNo.style.position = 'fixed';
  btnNo.style.left = x + 'px';
  btnNo.style.top = y + 'px';
  btnNo.style.zIndex = 5;

  noTries++;
  btnNo.textContent = noMessages[Math.min(noTries, noMessages.length-1)];

  const scale = Math.min(1 + noTries*0.06, 1.5);
  btnYes.style.transform = `scale(${scale})`;

  yesCounter.textContent = noTries === 1
    ? 'ela tentou clicar em "não"...'
    : `já são ${noTries} tentativas de fugir 🙄​`;
  yesCounter.classList.add('show');
}

btnNo.addEventListener('mouseenter', moveNoButton);
btnNo.addEventListener('click', (e) => { e.preventDefault(); moveNoButton(); });
btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); }, {passive:false});

const celebration = document.getElementById('celebration');

function confettiBurst(){
  for(let i=0;i<40;i++){
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-heart';
      const size = 10 + Math.random()*18;
      el.style.left = Math.random()*100 + 'vw';
      el.style.animationDuration = (3 + Math.random()*3) + 's';
      const color = colors[Math.floor(Math.random()*colors.length)];
      el.innerHTML = heartSVG(size, color);
      celebration.appendChild(el);
      setTimeout(()=> el.remove(), 6500);
    }, i*60);
  }
}

btnYes.addEventListener('click', () => {
  celebration.classList.add('active');
  confettiBurst();
  setInterval(confettiBurst, 2500);
});