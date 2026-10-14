/* ============================================================
   PREMIUM TEMPLATE — SCRIPT
   Generated ornaments (mandala, arch, toran, rules), falling
   petals canvas, generative plucked-string melody, the opening
   overlay, scroll reveals, live countdown, add-to-calendar
   and the RSVP form.
   Client values (wedding date, calendar, photos, RSVP) come from
   config.js — edit that file, not this one.
   ============================================================ */

(function(){
"use strict";
/* config.js declares INVITE_CONFIG with `const`, which is a global
   lexical binding, not a window property — check both. */
const CFG=window.INVITE_CONFIG||INVITE_CONFIG;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   1. Generated ornaments — mandala, cusped arch, toran, rule
   ========================================================= */
function mandalaSVG(){
  const C=300;
  const petal='M0 0 C6 -9 6 -22 0 -30 C-6 -22 -6 -9 0 0 Z';
  const ring=(n,r,s,fill,off=0)=>{
    let u='';
    for(let i=0;i<n;i++){
      const a=(360/n)*i+off;
      u+=`<use href="#mp" transform="rotate(${a.toFixed(2)} ${C} ${C}) translate(${C} ${(C-r).toFixed(1)}) scale(${s})"/>`;
    }
    return `<g class="${fill?'pf':'ps'}">${u}</g>`;
  };
  let dots='';
  for(let i=0;i<48;i++){
    const a=2*Math.PI*i/48;
    dots+=`<circle cx="${(C+252*Math.cos(a)).toFixed(1)}" cy="${(C+252*Math.sin(a)).toFixed(1)}" r="1.8"/>`;
  }
  return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <defs><path id="mp" d="${petal}"/></defs>
    <g class="mrings" fill="none" stroke="currentColor">
      <circle cx="300" cy="300" r="292"/><circle cx="300" cy="300" r="284"/>
      <circle cx="300" cy="300" r="230"/><circle cx="300" cy="300" r="150"/><circle cx="300" cy="300" r="90"/>
    </g>
    <g class="pd">${dots}</g>
    ${ring(32,276,.5,true)}
    ${ring(24,246,.68,false)}
    ${ring(16,204,.9,true)}
    ${ring(12,158,1.1,false)}
    ${ring(8,112,1.4,true)}
    ${ring(8,50,.62,false,22.5)}
    <circle class="mc" cx="300" cy="300" r="10"/>
  </svg>`;
}
const MANDALA=mandalaSVG();
['ovMandala','heroMandala','bandMandala'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=MANDALA;});

/* cusped (multifoil) arch */
function archSVG(w,h,cusps){
  const build=pad=>{
    const cx=w/2, spring=h*.66, apex=pad+h*.14, C0=[cx,spring+h*.08];
    const q=(t,a,b,c,d,e,f)=>[(1-t)*(1-t)*a+2*(1-t)*t*c+t*t*e,(1-t)*(1-t)*b+2*(1-t)*t*d+t*t*f];
    const pts=[];
    for(let i=0;i<=cusps;i++)pts.push(q(i/cusps,pad,spring,pad,apex,cx,apex));
    for(let i=cusps-1;i>=0;i--)pts.push(q(i/cusps,w-pad,spring,w-pad,apex,cx,apex));
    let d=`M ${pad} ${h-pad} L ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for(let i=1;i<pts.length;i++){
      const [x0,y0]=pts[i-1],[x1,y1]=pts[i];
      const mx=(x0+x1)/2,my=(y0+y1)/2;
      let ox=mx-C0[0],oy=my-C0[1];const L=Math.hypot(ox,oy)||1;ox/=L;oy/=L;
      const bl=Math.hypot(x1-x0,y1-y0)*.3;
      d+=` Q ${(mx+ox*bl).toFixed(1)} ${(my+oy*bl).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
    d+=` L ${w-pad} ${h-pad}`;
    return d;
  };
  const apexX=w/2, apexY=12+h*.14;
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <path d="${build(12)}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="${build(20)}" fill="none" stroke="currentColor" stroke-width="1" opacity=".65" stroke-linecap="round"/>
    <path d="M26 ${h-8} H${w-26}" fill="none" stroke="currentColor" stroke-width="1" opacity=".65"/>
    <circle cx="${apexX}" cy="${(apexY-7).toFixed(1)}" r="4" fill="currentColor"/>
    <rect x="${w/2-38}" y="${h-13}" width="6" height="6" transform="rotate(45 ${w/2-35} ${h-10})" fill="currentColor"/>
  </svg>`;
}
 $('#venueArch').innerHTML=archSVG(760,240,6);

/* toran — doorway garland of leaves and bells */
function toranSVG(){
  const dots=(a,b,n)=>{let s='';for(let i=0;i<=n;i++)s+=`<circle class="td" cx="${a+(b-a)*i/n}" cy="8" r="1.6"/>`;return s;};
  const leaf=(x,y,sc)=>`<path class="tl" transform="translate(${x} ${y}) scale(${sc})" d="M0 0 C3.4 -6 2.8 -13 0 -19 C-2.8 -13 -3.4 -6 0 0"/>`;
  const leaf2=(x,y,sc)=>`<path class="tl" transform="translate(${x} ${y}) scale(${-sc} 1)" d="M0 0 C3.4 -6 2.8 -13 0 -19 C-2.8 -13 -3.4 -6 0 0"/>`;
  const bell=(x,y)=>`<g transform="translate(${x} ${y})"><path class="tb" d="M0 -11 C4.6 -11 5.6 -5.8 5.6 -3 C7.2 -1.9 8 -1.2 8 -0.4 L-8 -0.4 C-8 -1.2 -7.2 -1.9 -5.6 -3 C-5.6 -5.8 -4.6 -11 0 -11 Z"/><circle class="tf" cy="2.2" r="1.6"/></g>`;
  let hangs='';
  [125,375,625,875].forEach(x=>hangs+=bell(x,38));
  [250,500,750].forEach(x=>{hangs+=leaf(x,26,.95)+leaf2(x+4,26,.7);});
  [62,187,312,437,562,687,812,937].forEach(x=>hangs+=leaf(x,20,.55)+leaf2(x+3,20,.42));
  return `<svg viewBox="0 0 1000 64" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <path class="ts thin" d="M0 8 H1000"/>
    ${dots(0,1000,16)}
    <path class="ts" d="M0 18 Q125 46 250 26 Q375 46 500 26 Q625 46 750 26 Q875 46 1000 18"/>
    ${hangs}
  </svg>`;
}
const TORAN=toranSVG();
 $('#toranTop').innerHTML=TORAN;
 $('#toranBottom').innerHTML=TORAN;

/* paisley section rule */
function ruleSVG(){
  const p=(x,rot)=>`<use href="#paisley" transform="translate(${x} 13) rotate(${rot}) scale(.36)"/>`;
  const pm=(x,rot)=>`<use href="#paisley" transform="translate(${x} 13) scale(-1 1) rotate(${rot}) scale(.36)"/>`;
  const dot=x=>`<circle class="rd" cx="${x}" cy="13" r="1.6"/>`;
  return `<svg viewBox="0 0 280 26" xmlns="http://www.w3.org/2000/svg">
    <line class="rl" x1="0" y1="13" x2="34" y2="13" stroke="currentColor"/>
    <line class="rl" x1="246" y1="13" x2="280" y2="13" stroke="currentColor"/>
    ${p(44,-85)}${p(76,-70)}${p(108,-58)}
    ${dot(62)}${dot(94)}${dot(126)}
    <use href="#i-flower" x="130" y="1" width="20" height="20" style="color:currentColor"/>
    ${pm(236,-85)}${pm(204,-70)}${pm(172,-58)}
    ${dot(218)}${dot(186)}${dot(154)}
  </svg>`;
}
 $$('.srule').forEach(el=>el.innerHTML=ruleSVG());

/* couple photos — the <img> tags carry no src; config.js supplies it
   (swap the files in assets/photos/ to change the photos). */
$$('img[data-photo]').forEach(img=>{
  const src=CFG.photos[img.dataset.photo];
  if(src)img.src=src;
});

/* =========================================================
   2. Falling petals — canvas with cursor wind + bursts
   ========================================================= */
const canvas=$('#petals'),ctx=canvas.getContext('2d');
let W=innerWidth,H=innerHeight,DPR=Math.min(devicePixelRatio||1,2);
const petals=[];
let wind=0,windTarget=0;
function sizeCanvas(){W=innerWidth;H=innerHeight;DPR=Math.min(devicePixelRatio||1,2);
  canvas.width=W*DPR;canvas.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);}
sizeCanvas();addEventListener('resize',sizeCanvas);

const ROSE=[214,96,88],BLUSH=[238,170,150],MARI=[240,166,34],JASM=[246,238,214],GOLD=[211,162,79];
function spawn(top){
  const r=Math.random();
  const kind=r<.55?'petal':'floret';
  const c=kind==='floret'?MARI:(r<.2?ROSE:r<.4?BLUSH:JASM);
  const s=kind==='floret'?2.2+Math.random()*2.6:4.5+Math.random()*6.5;
  return{x:Math.random()*W,y:top?-20-Math.random()*H*.3:Math.random()*H,
    kind,c,s,rot:Math.random()*Math.PI*2,rs:(Math.random()-.5)*.028,
    ph:Math.random()*Math.PI*2,ps:.006+Math.random()*.012,amp:.4+Math.random()*1.1,
    a:kind==='floret'?.55+Math.random()*.3:.3+Math.random()*.3,
    vx:0,vy:.35+(s/11)*.7,temp:false};
}
const BASE=()=>Math.max(10,Math.min(24,Math.round(W/55)));
for(let i=0;i<BASE();i++)petals.push(spawn(false));
function burst(x,y){
  for(let i=0;i<26;i++){
    const a=Math.random()*Math.PI*2,sp=2+Math.random()*4.5,p=spawn(false);
    p.x=x;p.y=y;p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp-1.6;
    p.c=Math.random()<.5?MARI:GOLD;p.a=.5+Math.random()*.3;p.temp=true;
    petals.push(p);
  }
  while(petals.length>BASE()+80)petals.shift();
}
function drawPetal(p){
  ctx.save();ctx.translate(p.x,p.y);
  if(p.kind==='floret'){
    ctx.rotate(p.rot);
    ctx.beginPath();ctx.arc(0,0,p.s,0,7);ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a})`;ctx.fill();
    ctx.beginPath();ctx.arc(0,0,p.s*.45,0,7);ctx.fillStyle='rgba(173,84,14,.55)';ctx.fill();
  }else{
    ctx.rotate(p.rot+Math.sin(p.ph)*.5);ctx.scale(p.s,p.s*.85);
    ctx.beginPath();ctx.moveTo(0,-1);
    ctx.bezierCurveTo(.9,-1.1,1.5,-.2,1.2,.5);
    ctx.bezierCurveTo(.9,1.1,.3,1.2,0,.9);
    ctx.bezierCurveTo(-.3,1.2,-.9,1.1,-1.2,.5);
    ctx.bezierCurveTo(-1.5,-.2,-.9,-1.1,0,-1);
    ctx.fillStyle=`rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a})`;ctx.fill();
  }
  ctx.restore();
}
addEventListener('mousemove',e=>{windTarget=Math.max(-2.5,Math.min(2.5,(e.movementX||0)*.05));},{passive:true});
function frame(){
  ctx.clearRect(0,0,W,H);
  wind+=(windTarget-wind)*.06;windTarget*=.9;
  for(let i=petals.length-1;i>=0;i--){
    const p=petals[i];
    p.ph+=p.ps;p.rot+=p.rs;
    const fall=.35+(p.s/11)*.8;
    p.vy+=(fall-p.vy)*(p.temp?.03:1);p.vx*=.94;
    p.x+=p.vx+wind*(.3+p.s/11)+Math.sin(p.ph)*p.amp*.35;
    p.y+=p.vy;
    if(p.x<-30)p.x=W+20;if(p.x>W+30)p.x=-20;
    if(p.y>H+40){if(p.temp){petals.splice(i,1);continue;}p.y=-20;p.x=Math.random()*W;}
    drawPetal(p);
  }
  requestAnimationFrame(frame);
}
if(!RM)requestAnimationFrame(frame);

/* =========================================================
   3. Background music — looping nasheed (audio file)
   ========================================================= */
const musicBtn=$('#musicBtn');
const MUSIC={src:(CFG.music&&CFG.music.src)||'assets/music/nafsiji.mp3',
             volume:(CFG.music&&typeof CFG.music.volume==='number')?CFG.music.volume:.6};
let audio=null,musicOn=false;
function ensureAudio(){
  if(audio)return audio;
  audio=new Audio(MUSIC.src);
  audio.loop=true;audio.preload='auto';audio.volume=0;
  return audio;
}
function fadeTo(target,done){
  if(!audio)return;
  const from=audio.volume,t0=performance.now(),dur=650;
  (function step(now){
    const k=Math.min(1,(now-t0)/dur);
    audio.volume=Math.max(0,Math.min(1,from+(target-from)*k));
    if(k<1)requestAnimationFrame(step);
    else if(done)done();
  })(t0);
}
function setMusic(on){
  musicOn=on;musicBtn.classList.toggle('on',on);
  musicBtn.title=on?'Pause the melody':'Play the melody';
  if(!audio)return;
  if(on){
    const p=audio.play();
    if(p&&p.catch)p.catch(()=>{});
    fadeTo(MUSIC.volume);
  }else fadeTo(0,()=>audio.pause());
}
musicBtn.addEventListener('click',()=>{ensureAudio();setMusic(!musicOn);});

/* =========================================================
   4. Open the invitation
   ========================================================= */
const overlay=$('#overlay'),openBtn=$('#openBtn');
let opened=false;
function finishOpen(){
  document.body.classList.remove('locked');
  document.body.classList.add('revealed');
  setTimeout(()=>overlay.style.display='none',1500);
}
openBtn.addEventListener('click',()=>{
  if(opened)return;opened=true;
  ensureAudio();
  setMusic(true); // the tap doubles as the audio unlock
  const r=openBtn.getBoundingClientRect();
  burst(r.left+r.width/2,r.top+r.height/2);
  if(RM){setTimeout(finishOpen,300);return;}
  setTimeout(()=>overlay.classList.add('gone'),900);
  setTimeout(finishOpen,1300);
});

/* =========================================================
   5. Scroll reveals, nav state, evening spine
   ========================================================= */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.15,rootMargin:'0px 0px -8% 0px'});
 $$('.reveal').forEach(el=>io.observe(el));

const nav=$('#nav'),timeline=$('#timeline'),tlFill=$('#tlFill'),nodes=$$('.ev .node');
let ticking=false;
function onScroll(){
  nav.classList.toggle('scrolled',scrollY>40);
  const tr=timeline.getBoundingClientRect();
  const passed=Math.min(Math.max(innerHeight*.55-tr.top,0),tr.height);
  tlFill.style.transform=`scaleY(${(passed/tr.height).toFixed(3)})`;
  const line=tr.top+passed;
  nodes.forEach(n=>{const r=n.getBoundingClientRect();n.style.borderColor=(r.top+r.height/2<=line)?'var(--gold)':'';});
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll);}},{passive:true});
onScroll();

/* =========================================================
   6. Live countdown — to 7 PM, 14 Feb 2027 (Dhaka, UTC+6)
   ========================================================= */
const TARGET=new Date(CFG.weddingDateTime).getTime();
const pad=v=>String(v).padStart(2,'0');
function tickCd(){
  let d=TARGET-Date.now();
  if(d<=0){clearInterval(cdT);$('#count').innerHTML='<p class="cd-done">just married!</p>';return;}
  const s=Math.floor(d/1000);
  $('#cdD').textContent=Math.floor(s/86400);
  $('#cdH').textContent=pad(Math.floor(s/3600)%24);
  $('#cdM').textContent=pad(Math.floor(s/60)%60);
  $('#cdS').textContent=pad(s%60);
}
tickCd();const cdT=setInterval(tickCd,1000);

/* =========================================================
   7. Toasts
   ========================================================= */
const toastBox=$('#toasts');
function toast(msg){
  const t=document.createElement('div');t.className='toast';
  t.innerHTML=`<svg class="ic"><use href="#i-flower"/></svg><span>${msg}</span>`;
  toastBox.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.add('hide');setTimeout(()=>t.remove(),450);},3600);
}

/* =========================================================
   8. Add to calendar (.ics generated locally)
   ========================================================= */
 $('#icsBtn').addEventListener('click',()=>{
  const cal=CFG.calendar;
  const ics=v=>new Date(v).toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
  const esc=v=>v.replace(/,/g,'\\,');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//'+cal.prodid+'//EN','BEGIN:VEVENT',
    'UID:'+cal.uid,'DTSTAMP:'+ics(Date.now()),
    'DTSTART:'+ics(CFG.weddingDateTime),
    'DTEND:'+ics(new Date(CFG.weddingDateTime).getTime()+cal.durationHours*3600000),
    'SUMMARY:'+cal.title,
    'LOCATION:'+esc(cal.location),
    'DESCRIPTION:'+esc(cal.description),
    'END:VEVENT','END:VCALENDAR'];
  const blob=new Blob([lines.join('\r\n')],{type:'text/calendar;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download=cal.filename;
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  toast('Saved to your calendar — see you on the fourteenth');
});

/* =========================================================
   9. RSVP — live preview, stepper, seal & storage
   ========================================================= */
const form=$('#rsvpForm'),nameI=$('#fName'),nameField=$('#nameField'),
      attY=$('#attY'),attN=$('#attN'),gNum=$('#gNum'),
      pvName=$('#pvName'),pvLine=$('#pvLine'),
      confirmEl=$('#confirm'),cName=$('#cName'),cBody=$('#cBody'),
      savedNote=$('#savedNote'),LS=CFG.rsvp.storageKey;
const WORDS=['zero','one','two','three','four','five','six','seven','eight'];
function updatePreview(){
  const n=nameI.value.trim();
  pvName.textContent=n||'Your name';
  pvName.classList.toggle('empty',!n);
  const g=Math.min(CFG.rsvp.maxParty,Math.max(1,parseInt(gNum.textContent)||1));
  pvLine.textContent=attY.checked
    ?`will join the celebration — party of ${WORDS[g]}`
    :'sends warm blessings from afar';
  form.classList.toggle('decline',!attY.checked);
}
nameI.addEventListener('input',()=>{nameField.classList.remove('error');updatePreview();});
[attY,attN].forEach(r=>r.addEventListener('change',updatePreview));
function setG(v){gNum.textContent=Math.min(CFG.rsvp.maxParty,Math.max(1,v));updatePreview();}
 $('#gPlus').addEventListener('click',()=>setG(parseInt(gNum.textContent)+1));
 $('#gMinus').addEventListener('click',()=>setG(parseInt(gNum.textContent)-1));

form.addEventListener('submit',e=>{
  e.preventDefault();
  const n=nameI.value.trim();
  if(!n){
    nameField.classList.add('error');
    nameI.classList.add('shake');setTimeout(()=>nameI.classList.remove('shake'),500);
    nameI.focus();toast('Please tell us your name first');return;
  }
  nameField.classList.remove('error');
  const data={n,att:attY.checked?'yes':'no',g:parseInt(gNum.textContent),
    song:$('#fSong').value.trim(),notes:$('#fNotes').value.trim(),ts:Date.now()};
  try{localStorage.setItem(LS,JSON.stringify(data));}catch(_){}
  cName.textContent=n.split(' ')[0];
  cBody.textContent=data.att==='yes'
    ?`Your reply has reached us with joy. We will keep seats for your party of ${WORDS[data.g]} — and save you the first slice of cake.`
    :'You will be dearly missed on the fourteenth of February — but your blessings travel with us. Thank you for letting us know.';
  form.style.display='none';
  confirmEl.classList.add('show');
  toast(data.att==='yes'?'Your reply has been sealed — thank you':'Thank you for letting us know');
});
 $('#editReply').addEventListener('click',()=>{
  confirmEl.classList.remove('show');form.style.display='';
});
try{
  const saved=JSON.parse(localStorage.getItem(LS)||'null');
  if(saved){
    nameI.value=saved.n||'';
    if(saved.att==='no')attN.checked=true;
    gNum.textContent=Math.min(CFG.rsvp.maxParty,Math.max(1,saved.g||1));
    $('#fSong').value=saved.song||'';
    $('#fNotes').value=saved.notes||'';
    savedNote.hidden=false;updatePreview();
  }
}catch(_){}
updatePreview();
})();
