/* ===== MUSIC (autoplay + fallback) ===== */
const bgMusic = document.getElementById('bg-music');
if (bgMusic) {
  bgMusic.volume = 0.9;
  bgMusic.play().catch(()=>{});
  let interacted = false;
  window.addEventListener('pointerdown', () => {
    if (!interacted) { bgMusic.play().catch(()=>{}); interacted = true; }
  });
}

/* ===== GLOBAL CLICK SFX ===== */
const clickSfx = document.getElementById('click-audio');

/* ===== SPA NAVIGATION ===== */
const links = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function showSection(id){
  sections.forEach(sec=>{
    sec.classList.toggle('hidden', sec.id !== id);
    sec.classList.toggle('active',  sec.id === id);
  });
}
links.forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const target = a.dataset.target;
    showSection(target);
    history.pushState({},'',`#${target}`);
    if(clickSfx){clickSfx.currentTime=0;clickSfx.play().catch(()=>{});}
  });
});
window.addEventListener('popstate', ()=>showSection(location.hash.replace('#','')||'home'));

/* ===== BUTTON RED TOGGLE ===== */
document.addEventListener('click',e=>{
  if(e.target.classList.contains('btn')){
    e.target.classList.toggle('clicked');
  }
});

/* ===== HEARTS ===== */
function spawnHearts(container,n=14){
  for(let i=0;i<n;i++){
    const h=document.createElement('span');
    h.className='heart';
    h.textContent='❤';
    h.style.left=Math.random()*100+'%';
    h.style.fontSize=(16+Math.random()*24)+'px';
    h.style.animationDelay=Math.random()*5+'s';
    container.appendChild(h);
  }
}
document.querySelectorAll('.section').forEach(sec=>spawnHearts(sec));

/* ===== VIDEO POPUP ===== */
const loveBtn  = document.getElementById('btn-love');
const vidModal = document.getElementById('love-video-popup');

if(loveBtn && vidModal){
  loveBtn.addEventListener('click',()=>{
    vidModal.classList.remove('hidden');
    if(clickSfx){clickSfx.currentTime=0;clickSfx.play().catch(()=>{});}
    const vid = vidModal.querySelector('video');
    if(vid){vid.currentTime=0;vid.play().catch(()=>{});}
  });
  vidModal.addEventListener('click',e=>{
    if(e.target===vidModal){
      vidModal.classList.add('hidden');
      const vid = vidModal.querySelector('video');
      if(vid)vid.pause();
    }
  });
}

/* ===== LETTER POPUP ===== */
const revealBtn = document.getElementById('reveal-letter');
const letModal  = document.getElementById('letter-popup');

if(revealBtn && letModal){
  revealBtn.addEventListener('click',()=>{
    letModal.classList.remove('hidden');
    if(clickSfx){clickSfx.currentTime=0;clickSfx.play().catch(()=>{});}
  });
  letModal.addEventListener('click',e=>{
    if(e.target===letModal){
      letModal.classList.add('hidden');
      const aud = letModal.querySelector('audio');
      if(aud){aud.pause();aud.currentTime=0;}
    }
  });
}
