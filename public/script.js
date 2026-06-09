'use strict';
// ═══════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════
const KQ = [
  { q:"Messi 2012 yılında kaç gol attı?", opts:["71","79","85","91"], ans:3 },
  { q:"En çok Dünya Kupası kazanan ülke?", opts:["Almanya","Arjantin","Brezilya","İtalya"], ans:2 },
  { q:"Şampiyonlar Ligi kupasının resmi adı?", opts:["Büyük Kulak","Henri Delaunay","Coupe des Clubs","UEFA Trophy"], ans:0 },
  { q:"Ronaldo'nun ilk Ballon d'Or yılı?", opts:["2004","2006","2008","2010"], ans:2 },
  { q:"Premier Lig'de en çok şampiyon takım?", opts:["Arsenal","Chelsea","Liverpool","Man. United"], ans:3 },
  { q:"2018 Dünya Kupası'nın ev sahibi ülke?", opts:["Brezilya","Almanya","Rusya","Katar"], ans:2 },
  { q:"Türkiye Süper Lig'de 4 yıldızlı takım hangisi?", opts:["Fenerbahçe","Galatasaray","Beşiktaş","Trabzon"], ans:1 },
  { q:"Hakan Şükür kariyerinde toplam kaç gol attı?", opts:["249","275","312","383"], ans:3 },
];
const NQ = { q:"Pelé futbol kariyerinde toplam kaç resmi gol attı?", ans:643 };
const CQ = {
  ans:"arjantin", disp:"ARJANTİN",
  clues:[
    "2022 FIFA Dünya Kupası şampiyonudur.",
    "Güney Amerika'da yer alır.",
    "Bayrağında mavi-beyaz renkler ve güneş sembolü bulunur.",
    "Lionel Messi bu ülkenin efsane oyuncusudur.",
    "Başkenti Buenos Aires'tir."
  ]
};
const F11 = {
  country:"Brezilya", form:"4-3-3",
  slots:[
    {id:"gk",pos:"GK",label:"KK",   x:50,y:88},
    {id:"rb",pos:"RB",label:"SAĞ B",x:82,y:70},
    {id:"cb1",pos:"CB",label:"STR",  x:62,y:72},
    {id:"cb2",pos:"CB",label:"STR",  x:38,y:72},
    {id:"lb",pos:"LB",label:"SOL B",x:18,y:70},
    {id:"cm1",pos:"CM",label:"OOS", x:22,y:50},
    {id:"cm2",pos:"CM",label:"OOS", x:50,y:47},
    {id:"cm3",pos:"CM",label:"OOS", x:78,y:50},
    {id:"lw",pos:"LW",label:"SOL K",x:14,y:26},
    {id:"st",pos:"ST",label:"FV",   x:50,y:18},
    {id:"rw",pos:"RW",label:"SAĞ K",x:86,y:26},
  ],
  players:[
    {n:"Alisson",p:"GK"},{n:"Ederson",p:"GK"},
    {n:"Danilo",p:"RB"},{n:"Marquinhos",p:"CB"},{n:"Thiago Silva",p:"CB"},
    {n:"Éder Militão",p:"CB"},{n:"Alex Sandro",p:"LB"},{n:"Alex Telles",p:"LB"},
    {n:"Casemiro",p:"CM"},{n:"Fabinho",p:"CM"},{n:"Fred",p:"CM"},
    {n:"Lucas Paquetá",p:"CM"},{n:"Bruno Guimarães",p:"CM"},
    {n:"Neymar",p:"LW"},{n:"Vinicius Jr.",p:"LW"},{n:"Antony",p:"RW"},
    {n:"Raphinha",p:"RW"},{n:"Rodrygo",p:"RW"},
    {n:"Gabriel Jesus",p:"ST"},{n:"Richarlison",p:"ST"},{n:"Firmino",p:"ST"},
  ]
};
const IMPOSTOR_DATA = [
  { name:"Messi", clues:["Arjantinli","solak","Barcelona"] },
  { name:"Ronaldo", clues:["Portekizli","7 numara","Manchester Utd"] },
  { name:"Neymar", clues:["Brezilyalı","Santos","PSG"] },
  { name:"Mbappé", clues:["Fransız","genç yıldız","Paris"] },
  { name:"Salah", clues:["Mısırlı","Liverpool","hızlı"] },
];
const FALSE_CLUES = ["forvet","kaleci","defans","orta saha","golcü","kaptan","hızlı","teknik","güçlü","yıldız"];

// DK Grup verisi: yıl, grup, takımlar ve puan durumu
const DK_GROUPS = [
  { year:"2010", group:"G", teams:[
    {name:"Brezilya", p:7, avg:3, gf:5, ga:2},
    {name:"Portekiz", p:5, avg:4, gf:7, ga:0},
    {name:"Fildişi Sahili", p:4, avg:1, gf:4, ga:3},
    {name:"Kuzey Kore", p:0, avg:-11, gf:1, ga:12}
  ]},
  { year:"2014", group:"D", teams:[
    {name:"Kosta Rika", p:7, avg:3, gf:4, ga:1},
    {name:"Uruguay", p:6, avg:1, gf:4, ga:4},
    {name:"İtalya", p:3, avg:-1, gf:2, ga:3},
    {name:"İngiltere", p:1, avg:-3, gf:2, ga:4}
  ]},
  { year:"2018", group:"F", teams:[
    {name:"İsveç", p:6, avg:3, gf:5, ga:2},
    {name:"Meksika", p:6, avg:-1, gf:3, ga:4},
    {name:"Güney Kore", p:3, avg:0, gf:3, ga:3},
    {name:"Almanya", p:3, avg:-2, gf:2, ga:4}
  ]},
  { year:"2022", group:"E", teams:[
    {name:"Japonya", p:6, avg:1, gf:4, ga:3},
    {name:"İspanya", p:4, avg:6, gf:9, ga:3},
    {name:"Almanya", p:4, avg:1, gf:6, ga:5},
    {name:"Kosta Rika", p:3, avg:-8, gf:3, ga:11}
  ]},
];
const WORDS = ["Dünya Kupası","Penaltı","Kırmızı Kart","Ofsayt","Korner","Faul","Stadyum","Kale","Hakem"];

// Ben Kimim? verisi
const WHOAMI_PLAYERS = [
  { name:"Messi", nat:"Arjantin", pos:"Forvet", club:"Inter Miami", foot:"Sol", wc:true, ballon:8 },
  { name:"Ronaldo", nat:"Portekiz", pos:"Forvet", club:"Al-Nassr", foot:"Sağ", wc:false, ballon:5 },
  { name:"Neymar", nat:"Brezilya", pos:"Forvet", club:"Al-Hilal", foot:"Sağ", wc:false, ballon:0 },
  { name:"Mbappé", nat:"Fransa", pos:"Forvet", club:"PSG", foot:"Sağ", wc:true, ballon:0 },
  { name:"Salah", nat:"Mısır", pos:"Forvet", club:"Liverpool", foot:"Sol", wc:false, ballon:0 },
  { name:"Modric", nat:"Hırvatistan", pos:"Orta Saha", club:"Real Madrid", foot:"Sağ", wc:false, ballon:1 },
  { name:"Benzema", nat:"Fransa", pos:"Forvet", club:"Al-Ittihad", foot:"Sağ", wc:false, ballon:1 },
  { name:"Lewandowski", nat:"Polonya", pos:"Forvet", club:"Barcelona", foot:"Sağ", wc:false, ballon:0 },
  { name:"Kane", nat:"İngiltere", pos:"Forvet", club:"Bayern Münih", foot:"Sağ", wc:false, ballon:0 },
  { name:"De Bruyne", nat:"Belçika", pos:"Orta Saha", club:"Manchester City", foot:"Sağ", wc:false, ballon:0 },
];

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
const S = {
  pts:{you:0,ahmet:0,can:0},
  round:0,
  timers:[],
  kh:{idx:0,answered:false},
  nm:{submitted:false,botA:0,botC:0},
  ct:{solved:false,clueIdx:0},
  f11:{slots:{},sel:null},
  dkg:{group:null, hiddenIdx:0, solved:false},
  imp:{secret:null, impostor:null, turn:0, clues:{you:'',ahmet:'',can:''}, active:false},
  wa:{players:{you:null,ahmet:null,can:null}, solved:{you:false,ahmet:false,can:false}, turn:0, active:false, lastQuestion:null},
  dr:{painting:false,color:"#111",size:4},
};
const MAX_PTS = 800;

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════
function show(id){
  document.querySelectorAll('.screen').forEach(s=>{s.classList.remove('on');});
  document.getElementById('sc-'+id).classList.add('on');
}

function feed(text,type='sys'){
  const b=document.getElementById('feed');
  const d=document.createElement('div');
  d.className='fm fm-'+type;
  d.innerHTML=text;
  b.appendChild(d);
  b.scrollTop=b.scrollHeight;
}

function setPts(who,val){
  S.pts[who]=val;
  document.getElementById('pts-'+who).textContent=val;
  const pct=Math.min(100,Math.round(val/MAX_PTS*100));
  document.getElementById('bar-'+who).style.width=pct+'%';
}
function addPts(who,v){ setPts(who,S.pts[who]+v); }

function clearT(){ S.timers.forEach(t=>clearInterval(t)); S.timers=[]; }
function tick(fn,ms){ const t=setInterval(fn,ms); S.timers.push(t); return t; }
function wait(fn,ms){ const t=setTimeout(fn,ms); S.timers.push(t); return t; }

function setRoundDots(r){
  document.getElementById('roundLabel').textContent = r>0?`TUR ${r} / 8`:'LOBİ';
  for(let i=1;i<=8;i++){
    const d=document.getElementById('rp'+i);
    d.className='rp-dot'+(i<r?' done':i===r?' active':'');
  }
}

function startTimer(tfgId,tnumId,total,dangerAt,onDone){
  const fg=document.getElementById(tfgId);
  const tn=document.getElementById(tnumId);
  const C=138; let elapsed=0;
  fg.style.strokeDasharray=C;
  fg.style.strokeDashoffset=0;
  fg.classList.remove('danger');
  tn.textContent=total;
  const t=tick(()=>{
    elapsed++;
    const pct=elapsed/total;
    fg.style.strokeDashoffset=C*pct;
    const rem=total-elapsed;
    tn.textContent=rem;
    if(rem<=dangerAt) fg.classList.add('danger');
    if(elapsed>=total){ clearInterval(t); onDone(); }
  },1000);
  return t;
}

function showRoundEnd(icon,title,sub,onNext){
  const el=document.getElementById('roundEnd');
  document.getElementById('re-icon').textContent=icon;
  document.getElementById('re-title').textContent=title;
  document.getElementById('re-sub').textContent=sub;
  document.getElementById('re-you').textContent=S.pts.you;
  document.getElementById('re-ahmet').textContent=S.pts.ahmet;
  document.getElementById('re-can').textContent=S.pts.can;
  document.getElementById('re-btn').onclick=()=>{el.classList.remove('show');clearT();onNext();};
  el.classList.add('show');
}

function countdown(label,cb){
  show('cd');
  document.getElementById('cd-sub').textContent=label;
  let n=3;
  document.getElementById('cd-num').textContent=n;
  const t=tick(()=>{
    n--;
    if(n<=0){clearT();cb();}
    else{ const el=document.getElementById('cd-num'); el.textContent=n; el.style.animation='none'; el.offsetHeight; el.style.animation=''; }
  },900);
}

// ═══════════════════════════════════════════════════════
// G — game controller
// ═══════════════════════════════════════════════════════
const G={

start(){
  S.round=1; setRoundDots(1);
  countdown("Tur 1 · Kahoot Soruları",()=>G.khStart());
},

nextRound(){
  S.round++;
  setRoundDots(S.round);
  if(S.round===2) countdown("Tur 2 · Sayı Tahmini",()=>G.nmStart());
  else if(S.round===3) countdown("Tur 3 · Ülke Bulmaca",()=>G.ctStart());
  else if(S.round===4) countdown("Tur 4 · İlk 11 Kur",()=>G.f11Start());
  else if(S.round===5) countdown("Tur 5 · DK Grubu",()=>G.dkgStart());
  else if(S.round===6) countdown("Tur 6 · İmpostor",()=>G.impStart());
  else if(S.round===7) countdown("Tur 7 · Ben Kimim?",()=>G.waStart());
  else if(S.round===8) countdown("Tur 8 · Çizim Finali",()=>G.drStart());
  else G.final();
},

// ── KAHOOT (8 soru, 20 sn) ──────────────────
khStart(){
  S.kh.idx=0; show('kahoot');
  feed("🏟 Tur 1 Başladı! 8 soru, hızlı cevapla.");
  G.khShow();
},
khShow(){
  clearT();
  S.kh.answered=false;
  const q=KQ[S.kh.idx];
  document.getElementById('kh-label').textContent=`TUR 1 · SORU ${S.kh.idx+1}/8`;
  document.getElementById('kh-qnum').textContent=`SORU ${S.kh.idx+1} / 8`;
  document.getElementById('kh-qtext').textContent=q.q;
  const opts=document.getElementById('kh-opts');
  opts.innerHTML='';
  ['A','B','C','D'].forEach((l,i)=>{
    const b=document.createElement('button');
    b.className='qbtn'; b.dataset.letter=l;
    b.innerHTML=`<span class="ql ql-${l.toLowerCase()}">${l}</span>${q.opts[i]}`;
    b.onclick=()=>G.khAnswer(i,b);
    opts.appendChild(b);
  });
  const pb=document.getElementById('kh-prog');
  pb.style.transition='none'; pb.style.width='100%';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ pb.style.transition='width 20s linear'; pb.style.width='0%'; }));
  startTimer('kh-tfg','kh-tnum',20,5,()=>G.khTimeout());
  wait(()=>G.khBot("Ahmet"),3000+Math.random()*5000);
  wait(()=>G.khBot("Can"),4000+Math.random()*7000);
},
khBot(name){
  if(S.kh.answered) return;
  const q=KQ[S.kh.idx];
  const ok=Math.random()<.42;
  const pick=ok?q.opts[q.ans]:q.opts[(q.ans+1+Math.floor(Math.random()*3))%4];
  feed(`<b>${name}:</b> ${pick}`,'bot');
  if(ok){ addPts(name==='Ahmet'?'ahmet':'can',ok?80:0); }
},
khAnswer(idx,btn){
  if(S.kh.answered) return;
  S.kh.answered=true; clearT();
  const q=KQ[S.kh.idx];
  document.querySelectorAll('#kh-opts .qbtn').forEach((b,i)=>{
    b.disabled=true;
    if(i===q.ans) b.classList.add('ok');
    else if(b===btn) b.classList.add('no');
  });
  if(idx===q.ans){ addPts('you',100); feed("✅ Doğru! +100"); }
  else feed(`❌ Yanlış — Doğru: ${q.opts[q.ans]}`);
  wait(()=>G.khNext(),1800);
},
khTimeout(){
  if(S.kh.answered) return;
  S.kh.answered=true;
  const q=KQ[S.kh.idx];
  document.querySelectorAll('#kh-opts .qbtn').forEach((b,i)=>{ b.disabled=true; if(i===q.ans) b.classList.add('ok'); });
  feed(`⏱ Süre bitti — Doğru: ${q.opts[q.ans]}`);
  wait(()=>G.khNext(),1800);
},
khNext(){
  S.kh.idx++;
  if(S.kh.idx<KQ.length){ G.khShow(); }
  else{
    clearT();
    const ldr=S.pts.you>=S.pts.ahmet&&S.pts.you>=S.pts.can?'Sen':S.pts.ahmet>=S.pts.can?'Ahmet':'Can';
    showRoundEnd("🎯","TUR 1 BİTTİ",`Lider: ${ldr}`,()=>G.nextRound());
  }
},

// ── NUMBER (30 sn) ──────────────────
nmStart(){
  S.nm.submitted=false;
  S.nm.botA=560+Math.round(Math.random()*120);
  S.nm.botC=680+Math.round(Math.random()*90);
  show('num');
  document.getElementById('nm-q').textContent=NQ.q;
  document.getElementById('nm-input').value='';
  document.getElementById('nm-input').disabled=false;
  document.getElementById('nm-btn').disabled=false;
  document.getElementById('nm-result').classList.remove('show');
  document.getElementById('nm-guesses').innerHTML='';
  feed("🔢 Tur 2 Başladı! Sayıyı tahmin et.");
  startTimer('nm-tfg','nm-tnum',30,5,()=>G.numSubmit());
  wait(()=>{ feed(`<b>Ahmet:</b> ${S.nm.botA}`,'bot'); G._addPill('Ahmet',S.nm.botA); },8000+Math.random()*6000);
  wait(()=>{ feed(`<b>Can:</b> ${S.nm.botC}`,'bot'); G._addPill('Can',S.nm.botC); },12000+Math.random()*7000);
},
_addPill(name,val){
  const r=document.getElementById('nm-guesses');
  const d=document.createElement('div');
  d.className='guess-pill'+(name==='Sen'?' you':'');
  d.innerHTML=`<b>${name}</b>: ${val}`;
  r.appendChild(d);
},
numSubmit(){
  if(S.nm.submitted) return;
  S.nm.submitted=true; clearT();
  document.getElementById('nm-input').disabled=true;
  document.getElementById('nm-btn').disabled=true;
  const val=parseInt(document.getElementById('nm-input').value)||0;
  G._addPill('Sen',val);
  const dY=Math.abs(NQ.ans-val), dA=Math.abs(NQ.ans-S.nm.botA), dC=Math.abs(NQ.ans-S.nm.botC);
  const mn=Math.min(dY,dA,dC);
  const rbox=document.getElementById('nm-result');
  document.getElementById('nm-rval').textContent=`Doğru: ${NQ.ans}`;
  let winner='';
  if(mn===dY){ addPts('you',100); winner='SEN KAZANDIN! +100'; document.getElementById('nm-rsub').textContent=`Farkın: ${dY}`; }
  else if(mn===dA){ addPts('ahmet',100); winner='Ahmet kazandı!'; document.getElementById('nm-rsub').textContent=`Ahmet: ${S.nm.botA}, fark: ${dA}`; }
  else { addPts('can',100); winner='Can kazandı!'; document.getElementById('nm-rsub').textContent=`Can: ${S.nm.botC}, fark: ${dC}`; }
  rbox.classList.add('show');
  feed(`🎯 Doğru: ${NQ.ans} — ${winner}`);
  wait(()=>showRoundEnd("🔢","TUR 2 BİTTİ",winner,()=>G.nextRound()),2800);
},

// ── COUNTRY ─────────────────────────────────
ctStart(){
  S.ct.solved=false; S.ct.clueIdx=0;
  show('country');
  document.getElementById('ct-clues').innerHTML='';
  document.getElementById('ct-input').value='';
  document.getElementById('ct-input').disabled=false;
  feed("🌍 Tur 3 Başladı! Ülkeyi bul, chate yaz.");
  G._ctClue();
  const botList=["brezilya","fransa","almanya","ispanya","portekiz","hollanda"];
  const botInt=tick(()=>{
    if(S.ct.solved) return;
    const n=Math.random()>.5?'Ahmet':'Can';
    feed(`<b>${n}:</b> ${botList[Math.floor(Math.random()*botList.length)]}`,'bot');
  },8000);
  wait(()=>{ if(!S.ct.solved){ const n=Math.random()>.5?'Ahmet':'Can'; feed(`<b>${n}:</b> ${CQ.ans}`,'bot'); G.ctSolve(n); } },45000);
  const ci=tick(()=>{
    if(S.ct.solved) return;
    S.ct.clueIdx++;
    if(S.ct.clueIdx<CQ.clues.length) G._ctClue();
    else{
      clearT();
      if(!S.ct.solved){
        feed(`⏱ Kimse bulamadı! Cevap: ${CQ.disp}`);
        wait(()=>showRoundEnd("🌍","TUR 3 BİTTİ","Kimse bulamadı!",()=>G.nextRound()),2200);
      }
    }
  },12000);
},
_ctClue(){
  const box=document.getElementById('ct-clues');
  const d=document.createElement('div');
  d.className='clue-item';
  d.innerHTML=`<div class="ci-tag">İpucu ${S.ct.clueIdx+1}</div><div class="ci-text">${CQ.clues[S.ct.clueIdx]}</div>`;
  box.appendChild(d);
},
ctryGuess(){
  const v=document.getElementById('ct-input').value.trim().toLowerCase();
  if(!v) return;
  document.getElementById('ct-input').value='';
  feed(`<b>Sen:</b> ${v}`,'you');
  if(!S.ct.solved && v===CQ.ans) G.ctSolve('Sen');
},
ctSolve(who){
  if(S.ct.solved) return;
  S.ct.solved=true; clearT();
  document.getElementById('ct-input').disabled=true;
  if(who==='Sen'){ addPts('you',100); feed(`🎉 Doğru! ${CQ.disp} +100`); }
  else { feed(`✅ ${who} buldu! Cevap: ${CQ.disp}`); addPts(who==='Ahmet'?'ahmet':'can',100); }
  wait(()=>showRoundEnd("🌍","TUR 3 BİTTİ",`${CQ.disp} bulundu! — ${who}`,()=>G.nextRound()),2000);
},

// ── FIRST 11 ────────────────────────────────
f11Start(){
  S.f11.slots={}; S.f11.sel=null;
  show('f11');
  document.getElementById('f11-title').textContent=`${F11.country} · ${F11.form}`;
  document.getElementById('f11-placed').textContent='0';
  document.getElementById('f11-sel').textContent='Mevki seç';
  document.getElementById('f11-search').value='';
  document.getElementById('f11-sugg').innerHTML='';
  G.f11BuildPitch();
  feed(`⚽ Tur 4: ${F11.country}'nın İlk 11'ini kur (${F11.form})`);
  const fg=document.getElementById('f11-tfg');
  const tn=document.getElementById('f11-tnum');
  const TOTAL=120; let el=0;
  fg.style.strokeDasharray='138'; fg.style.strokeDashoffset=0;
  const ti=tick(()=>{
    el++; const rem=TOTAL-el;
    tn.textContent=rem;
    fg.style.strokeDashoffset=138*(el/TOTAL);
    if(rem<=15) fg.classList.add('danger');
    if(rem<=0){ clearT(); G.f11Submit(); }
  },1000);
},
f11BuildPitch(){
  const svg=document.getElementById('pitch-svg');
  svg.querySelectorAll('.slot-g').forEach(e=>e.remove());
  F11.slots.forEach(slot=>{
    const g=document.createElementNS('http://www.w3.org/2000/svg','g');
    g.classList.add('slot-g','slot-dot');
    g.setAttribute('id','sg-'+slot.id);
    const cx=slot.x/100*270, cy=slot.y/100*360;
    const outer=document.createElementNS('http://www.w3.org/2000/svg','circle');
    outer.setAttribute('cx',cx); outer.setAttribute('cy',cy); outer.setAttribute('r','12');
    outer.setAttribute('fill','rgba(245,166,35,.15)'); outer.setAttribute('stroke','rgba(245,166,35,.4)'); outer.setAttribute('stroke-width','1.5');
    outer.classList.add('outer');
    const inner=document.createElementNS('http://www.w3.org/2000/svg','circle');
    inner.setAttribute('cx',cx); inner.setAttribute('cy',cy); inner.setAttribute('r','8');
    inner.setAttribute('fill','#1c2030'); inner.setAttribute('id','ic-'+slot.id);
    const lbl=document.createElementNS('http://www.w3.org/2000/svg','text');
    lbl.setAttribute('x',cx); lbl.setAttribute('y',cy+2.5);
    lbl.classList.add('slot-label'); lbl.setAttribute('id','sl-'+slot.id); lbl.textContent=slot.pos;
    const nm=document.createElementNS('http://www.w3.org/2000/svg','text');
    nm.setAttribute('x',cx); nm.setAttribute('y',cy+18);
    nm.classList.add('slot-name'); nm.setAttribute('id','sn-'+slot.id); nm.textContent='';
    g.appendChild(outer); g.appendChild(inner); g.appendChild(lbl); g.appendChild(nm);
    g.onclick=()=>G.f11Select(slot.id,slot.pos);
    svg.appendChild(g);
  });
},
f11Select(id,pos){
  S.f11.sel=id;
  document.getElementById('f11-sel').textContent=pos;
  F11.slots.forEach(s=>{
    const ic=document.getElementById('ic-'+s.id);
    if(ic) ic.setAttribute('fill',s.id===id?'rgba(245,166,35,.35)':'#1c2030');
  });
  document.getElementById('f11-search').value='';
  document.getElementById('f11-search').focus();
  G.f11Search();
},
f11Search(){
  const q=document.getElementById('f11-search').value.toLowerCase();
  const slot=F11.slots.find(s=>s.id===S.f11.sel);
  const box=document.getElementById('f11-sugg');
  if(!slot){ box.innerHTML=''; return; }
  const validPos=[slot.pos];
  if(slot.pos==='CM') validPos.push('DM');
  if(slot.pos==='LW') validPos.push('LW','LM');
  if(slot.pos==='RW') validPos.push('RW','RM');
  const fil=F11.players.filter(p=>validPos.includes(p.p)&&(q===''||p.n.toLowerCase().includes(q))).slice(0,7);
  if(!fil.length){ box.innerHTML='<div class="sugg-item" style="color:var(--muted)">Oyuncu bulunamadı</div>'; return; }
  box.innerHTML=fil.map(p=>`<div class="sugg-item" onclick="G.f11Place('${p.n}','${p.p}')"><span>${p.n}</span><span class="sugg-pos">${p.p}</span></div>`).join('');
},
f11Place(name,pos){
  if(!S.f11.sel) return;
  const id=S.f11.sel;
  S.f11.slots[id]=name;
  const ic=document.getElementById('ic-'+id);
  if(ic){ ic.setAttribute('fill','rgba(76,175,147,.4)'); ic.setAttribute('stroke','var(--green)'); }
  const sl=document.getElementById('sl-'+id);
  if(sl) sl.textContent='✓';
  const sn=document.getElementById('sn-'+id);
  if(sn) sn.textContent=name.split(' ').slice(-1)[0].substring(0,9);
  S.f11.sel=null;
  document.getElementById('f11-sel').textContent='Mevki seç';
  document.getElementById('f11-search').value='';
  document.getElementById('f11-sugg').innerHTML='';
  document.getElementById('f11-placed').textContent=Object.keys(S.f11.slots).length;
},
f11Submit(){
  clearT();
  const p=Object.keys(S.f11.slots).length;
  const pts=Math.min(p*10,110);
  addPts('you',pts);
  addPts('ahmet',50+Math.round(Math.random()*40));
  addPts('can',40+Math.round(Math.random()*50));
  feed(`📋 Kadron teslim edildi! ${p}/11 oyuncu — +${pts} puan`);
  showRoundEnd("📋","TUR 4 BİTTİ",`${p}/11 oyuncu yerleştirdin`,()=>G.nextRound());
},

// ── DK GRUP BULMACA ─────────────────────────
dkgStart(){
  const grp = DK_GROUPS[Math.floor(Math.random()*DK_GROUPS.length)];
  const hiddenIdx = Math.floor(Math.random()*4); // 0-3 arası rastgele bir takımı gizle
  S.dkg.group = grp;
  S.dkg.hiddenIdx = hiddenIdx;
  S.dkg.solved = false;
  show('dkgroup');
  document.getElementById('dk-year').textContent = `${grp.year} Dünya Kupası, Grup ${grp.group}`;
  const cont = document.getElementById('dk-teams');
  cont.innerHTML = '';
  grp.teams.forEach((t,i)=>{
    if(i===hiddenIdx) return; // gizli takımı gösterme
    const div = document.createElement('div');
    div.style.cssText = 'background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; font-size:15px';
    div.innerHTML = `<strong>${t.name}</strong><span>P:${t.p} | Av:${t.avg>=0?'+'+t.avg:t.avg} | AG:${t.gf} | YG:${t.ga}</span>`;
    cont.appendChild(div);
  });
  const hiddenDiv = document.createElement('div');
  hiddenDiv.style.cssText = 'background:var(--card); border:1px dashed var(--accent); border-radius:12px; padding:12px; margin-bottom:8px; font-size:15px; text-align:center; color:var(--accent)';
  hiddenDiv.textContent = '???';
  cont.appendChild(hiddenDiv);
  document.getElementById('dk-input').value = '';
  document.getElementById('dk-input').disabled = false;
  feed(`🏆 DK Grubu turu! ${grp.year} yılındaki eksik takımı bul.`);
  startTimer('dk-tfg','dk-tnum',60,10,()=>G.dkgTimeout());
  // Botların tahminleri
  const botGuessTimes = [15000, 30000, 45000]; // 3 farklı zamanda bot tahmini
  botGuessTimes.forEach(delay=>{
    wait(()=>{
      if(S.dkg.solved) return;
      const botName = Math.random()>.5?'Ahmet':'Can';
      const botKey = botName==='Ahmet'?'ahmet':'can';
      const allTeams = grp.teams.map(t=>t.name);
      const guess = allTeams[Math.floor(Math.random()*4)];
      feed(`<b>${botName}:</b> ${guess}`,'bot');
      if(guess === grp.teams[hiddenIdx].name){
        S.dkg.solved = true;
        clearT();
        addPts(botKey, 100);
        feed(`✅ ${botName} bildi! Doğru: ${guess} +100`);
        wait(()=>showRoundEnd("🏆","TUR 5 BİTTİ",`${botName} bildi!`,()=>G.nextRound()),1500);
      } else {
        addPts(botKey, -10);
        feed(`❌ ${botName} yanlış tahmin! -10`);
      }
    }, delay);
  });
},
dkgGuess(){
  if(S.dkg.solved) return;
  const input = document.getElementById('dk-input');
  const guess = input.value.trim().toLowerCase();
  if(!guess) return;
  input.value = '';
  const correct = guess === S.dkg.group.teams[S.dkg.hiddenIdx].name.toLowerCase();
  if(correct){
    S.dkg.solved = true;
    clearT();
    addPts('you', 100);
    feed(`🎉 Doğru! Eksik takım ${S.dkg.group.teams[S.dkg.hiddenIdx].name} +100`,'you');
    document.getElementById('dk-input').disabled = true;
    wait(()=>showRoundEnd("🏆","TUR 5 BİTTİ","Doğru bildin!",()=>G.nextRound()),1500);
  } else {
    addPts('you', -10);
    feed(`❌ Yanlış tahmin! -10 puan. Tekrar dene.`,'you');
  }
},
dkgTimeout(){
  if(S.dkg.solved) return;
  S.dkg.solved = true;
  clearT();
  feed(`⏱ Süre bitti! Gizli takım: ${S.dkg.group.teams[S.dkg.hiddenIdx].name}`);
  document.getElementById('dk-input').disabled = true;
  wait(()=>showRoundEnd("🏆","TUR 5 BİTTİ","Kimse bilemedi!",()=>G.nextRound()),2000);
},

// ── IMPOSTOR ────────────────────────────────
impStart(){
  const data = IMPOSTOR_DATA[Math.floor(Math.random()*IMPOSTOR_DATA.length)];
  const bots = ['ahmet','can'];
  const impostorBot = bots[Math.floor(Math.random()*2)];
  S.imp.secret = data;
  S.imp.impostor = impostorBot;
  S.imp.turn = 0;
  S.imp.clues = {you:'', ahmet:'', can:''};
  S.imp.active = true;
  show('impostor');
  document.getElementById('imp-secret').textContent = data.name;
  document.getElementById('imp-clue-section').style.display = 'block';
  document.getElementById('imp-vote-section').style.display = 'none';
  document.getElementById('imp-clue-input').value = '';
  document.getElementById('imp-clue-input').disabled = false;
  feed("🕵️ İmpostor turu! Gizli futbolcuyu ipuçlarıyla anlat, yalancıyı bul.");
  startTimer('imp-tfg','imp-tnum',30,8,()=>G.impTimeout());
  G.impNextTurn();
},
impNextTurn(){
  if(!S.imp.active) return;
  const turn = S.imp.turn;
  if(turn === 0){
    // Senin sıran
  } else {
    const botName = turn === 1 ? 'Ahmet' : 'Can';
    const botKey = turn === 1 ? 'ahmet' : 'can';
    wait(()=>{
      if(!S.imp.active) return;
      let clue;
      if(botKey === S.imp.impostor){
        clue = FALSE_CLUES[Math.floor(Math.random()*FALSE_CLUES.length)];
      } else {
        const clues = S.imp.secret.clues;
        clue = clues[Math.floor(Math.random()*clues.length)];
      }
      S.imp.clues[botKey] = clue;
      feed(`<b>${botName}:</b> ${clue}`,'bot');
      S.imp.turn++;
      if(S.imp.turn > 2){
        G.impShowVote();
      } else {
        G.impNextTurn();
      }
    }, 1500 + Math.random()*2000);
  }
},
impSubmitClue(){
  if(!S.imp.active || S.imp.turn !== 0) return;
  const input = document.getElementById('imp-clue-input');
  const clue = input.value.trim();
  if(!clue) return;
  input.disabled = true;
  S.imp.clues.you = clue;
  feed(`<b>Sen:</b> ${clue}`,'you');
  S.imp.turn = 1;
  G.impNextTurn();
},
impTimeout(){
  if(!S.imp.active) return;
  ['ahmet','can'].forEach(botKey=>{
    if(!S.imp.clues[botKey]){
      const isImp = botKey === S.imp.impostor;
      const clue = isImp ? FALSE_CLUES[Math.floor(Math.random()*FALSE_CLUES.length)] : S.imp.secret.clues[0];
      S.imp.clues[botKey] = clue;
      feed(`<b>${botKey==='ahmet'?'Ahmet':'Can'}:</b> ${clue}`,'bot');
    }
  });
  G.impShowVote();
},
impShowVote(){
  clearT();
  S.imp.active = true;
  document.getElementById('imp-clue-section').style.display = 'none';
  document.getElementById('imp-vote-section').style.display = 'block';
  const btns = document.getElementById('imp-vote-btns');
  btns.innerHTML = '';
  ['Ahmet','Can'].forEach((name,idx)=>{
    const btn = document.createElement('button');
    btn.className = 'qbtn';
    btn.innerHTML = `<span class="ql ql-${idx===0?'a':'b'}">${idx===0?'A':'B'}</span>${name}`;
    btn.onclick = ()=>G.impVote(idx===0?'ahmet':'can');
    btns.appendChild(btn);
  });
},
impVote(selectedBot){
  if(!S.imp.active) return;
  S.imp.active = false;
  clearT();
  const correct = selectedBot === S.imp.impostor;
  if(correct){
    addPts('you',150);
    feed("🕵️ Doğru! İmpostoru yakaladın! +150");
  } else {
    addPts(S.imp.impostor==='ahmet'?'ahmet':'can', 100);
    feed(`😈 Yanlış! İmpostor ${S.imp.impostor==='ahmet'?'Ahmet':'Can'} kaçtı!`);
  }
  wait(()=>showRoundEnd("🕵️","TUR 6 BİTTİ",correct?"İmpostor yakalandı!":"İmpostor kaçtı!",()=>G.nextRound()),2000);
},

// ── WHO AM I? ───────────────────────────────
waStart(){
  const shuffled = [...WHOAMI_PLAYERS].sort(()=>Math.random()-0.5);
  const youPlayer = shuffled[0];
  const ahmetPlayer = shuffled[1];
  const canPlayer = shuffled[2];
  S.wa.players = {you:youPlayer, ahmet:ahmetPlayer, can:canPlayer};
  S.wa.solved = {you:false, ahmet:false, can:false};
  S.wa.turn = 0;
  S.wa.active = true;
  S.wa.lastQuestion = null;
  show('whoami');
  document.getElementById('wa-your-player').textContent = youPlayer.name;
  document.getElementById('wa-active-section').style.display = 'block';
  document.getElementById('wa-done-section').style.display = 'none';
  document.getElementById('wa-question-input').disabled = false;
  document.getElementById('wa-question-input').value = '';
  document.getElementById('wa-guess-input').disabled = false;
  document.getElementById('wa-guess-input').value = '';
  feed("🤔 Ben Kimim? Herkes sırayla soru sorar, tahmin eder.");
  startTimer('wa-tfg','wa-tnum',180,20,()=>G.waTimeout());
  G.waNextTurn();
},
waNextTurn(){
  if(!S.wa.active) return;
  if(S.wa.solved.you && S.wa.turn === 0){
    S.wa.turn = 1;
    G.waBotTurn();
    return;
  }
  if(S.wa.turn === 0){
    document.getElementById('wa-question-input').disabled = false;
    document.getElementById('wa-guess-input').disabled = false;
    document.getElementById('wa-active-section').style.display = 'block';
    document.getElementById('wa-done-section').style.display = 'none';
  } else {
    document.getElementById('wa-question-input').disabled = true;
    document.getElementById('wa-guess-input').disabled = true;
    G.waBotTurn();
  }
},
waBotTurn(){
  if(!S.wa.active) return;
  const botName = S.wa.turn === 1 ? 'Ahmet' : 'Can';
  const botKey = S.wa.turn === 1 ? 'ahmet' : 'can';
  if(S.wa.solved[botKey]){
    S.wa.turn = (S.wa.turn + 1) % 3;
    if(S.wa.allSolved()) G.waEnd();
    else G.waNextTurn();
    return;
  }
  wait(()=>{
    if(!S.wa.active) return;
    const shouldGuess = Math.random() < 0.25 && !S.wa.solved[botKey];
    if(shouldGuess){
      const player = S.wa.players[botKey];
      const correctGuess = Math.random() < 0.4;
      if(correctGuess){
        S.wa.solved[botKey] = true;
        feed(`<b>${botName}:</b> Ben ${player.name} miyim? Evet! +100`,'bot');
        addPts(botKey, 100);
      } else {
        const wrongNames = WHOAMI_PLAYERS.filter(p=>p.name !== player.name).map(p=>p.name);
        const wrongGuess = wrongNames[Math.floor(Math.random()*wrongNames.length)];
        feed(`<b>${botName}:</b> Ben ${wrongGuess} miyim? Hayır! -20`,'bot');
        addPts(botKey, -20);
      }
    } else {
      const question = G.waGenerateBotQuestion(botKey);
      S.wa.lastQuestion = {from:botKey, question:question};
      feed(`<b>${botName}:</b> ${question}`,'bot');
      G.waAnswerQuestion(botKey, question);
    }
    S.wa.turn = (S.wa.turn + 1) % 3;
    if(S.wa.allSolved()) G.waEnd();
    else G.waNextTurn();
  }, 2000 + Math.random()*3000);
},
waGenerateBotQuestion(botKey){
  const player = S.wa.players[botKey];
  const qTypes = ['nat','pos','club','foot','wc','ballon'];
  const type = qTypes[Math.floor(Math.random()*qTypes.length)];
  switch(type){
    case 'nat': return `Benim ülkem ${player.nat} mi?`;
    case 'pos': return `Ben ${player.pos} miyim?`;
    case 'club': return `Ben ${player.club} takımında mı oynuyorum?`;
    case 'foot': return `Benim ayak tercihim ${player.foot} mi?`;
    case 'wc': return `Ben Dünya Kupası kazandım mı?`;
    case 'ballon': return `Ben Ballon d'Or kazandım mı?`;
    default: return `Ben ünlü bir futbolcu muyum?`;
  }
},
waAnswerQuestion(askerKey, question){
  const players = ['you','ahmet','can'].filter(k=>k!==askerKey);
  players.forEach(key=>{
    if(key==='you'){
      wait(()=>{
        if(!S.wa.active) return;
        const yourPlayer = S.wa.players.you;
        feed(`<b>Sen:</b> (Senin için otomatik cevap) ${G.waEvaluateQuestion(yourPlayer, question)?'Evet':'Hayır'}`,'you');
      },1000);
    } else {
      const botName = key==='ahmet'?'Ahmet':'Can';
      const botPlayer = S.wa.players[key];
      const answer = G.waEvaluateQuestion(botPlayer, question);
      wait(()=>{
        if(!S.wa.active) return;
        feed(`<b>${botName}:</b> ${answer?'Evet':'Hayır'}`,'bot');
      }, 500+Math.random()*1000);
    }
  });
},
waEvaluateQuestion(player, question){
  const q = question.toLowerCase();
  if(q.includes('ülkem') || q.includes('milli')) return q.includes(player.nat.toLowerCase());
  if(q.includes('mevki') || q.includes('pozisyon') || q.includes('forvet') || q.includes('orta saha')) return q.includes(player.pos.toLowerCase());
  if(q.includes('takım') || q.includes('kulüp')) return q.includes(player.club.toLowerCase());
  if(q.includes('ayak') || q.includes('solak') || q.includes('sağak')){
    if(q.includes('sol')) return player.foot==='Sol';
    if(q.includes('sağ')) return player.foot==='Sağ';
  }
  if(q.includes('dünya kupası') || q.includes('world cup')) return player.wc;
  if(q.includes('ballon') || q.includes('altın top')) return player.ballon>0;
  return false;
},
waAskQuestion(){
  if(!S.wa.active || S.wa.turn !== 0 || S.wa.solved.you) return;
  const input = document.getElementById('wa-question-input');
  const question = input.value.trim();
  if(!question) return;
  input.disabled = true;
  S.wa.lastQuestion = {from:'you', question:question};
  feed(`<b>Sen:</b> ${question}`,'you');
  ['ahmet','can'].forEach(key=>{
    const botName = key==='ahmet'?'Ahmet':'Can';
    const botPlayer = S.wa.players[key];
    const answer = G.waEvaluateQuestion(botPlayer, question);
    wait(()=>{
      if(!S.wa.active) return;
      feed(`<b>${botName}:</b> ${answer?'Evet':'Hayır'}`,'bot');
    }, 800+Math.random()*1500);
  });
  S.wa.turn = 1;
  input.value = '';
  if(S.wa.allSolved()) G.waEnd();
  else G.waNextTurn();
},
waGuess(){
  if(!S.wa.active || S.wa.solved.you) return;
  const input = document.getElementById('wa-guess-input');
  const guess = input.value.trim().toLowerCase();
  if(!guess) return;
  input.disabled = true;
  const correct = guess === S.wa.players.you.name.toLowerCase();
  if(correct){
    S.wa.solved.you = true;
    addPts('you', 100);
    feed(`🎉 Doğru tahmin! Sen ${S.wa.players.you.name} idin! +100`,'you');
    document.getElementById('wa-active-section').style.display = 'none';
    document.getElementById('wa-done-section').style.display = 'block';
    if(S.wa.allSolved()) G.waEnd();
  } else {
    addPts('you', -20);
    feed(`❌ Yanlış tahmin! -20 puan.`,'you');
    input.disabled = false;
    input.value = '';
  }
},
waTimeout(){
  if(!S.wa.active) return;
  ['you','ahmet','can'].forEach(key=>{
    if(!S.wa.solved[key]){
      addPts(key==='you'?'you':key, -10);
    }
  });
  feed("⏱ Süre bitti! Herkes -10 puan.");
  G.waEnd();
},
allSolved(){
  return S.wa.solved.you && S.wa.solved.ahmet && S.wa.solved.can;
},
waEnd(){
  S.wa.active = false;
  clearT();
  const msg = S.wa.solved.you ? "Kendini bildin!" : "Bilemedin!";
  wait(()=>showRoundEnd("🤔","TUR 7 BİTTİ",msg,()=>G.nextRound()),1500);
},

// ── DRAW (90 sn) ────────────────────────────
drStart(){
  show('draw');
  const word=WORDS[Math.floor(Math.random()*WORDS.length)];
  document.getElementById('dr-word').textContent=word;
  G.drInit();
  S.dr.color='#111'; S.dr.size=4;
  feed(`✏️ Tur 8: "${word}" çiz! Botlar tahmin ediyor.`);
  startTimer('dr-tfg','dr-tnum',90,15,()=>G.drEnd(null,word));
  const guesses=["top","kale","saha","forvet","penaltı","kulüp","şampiyon","gol","kupa","hakem"];
  let gc=0;
  const bi=tick(()=>{
    gc++; const n=Math.random()>.5?'Ahmet':'Can';
    if(gc===8){ clearT(); feed(`<b>${n}:</b> ${word.toLowerCase()}`,'bot'); G.drEnd(n,word); }
    else feed(`<b>${n}:</b> ${guesses[Math.floor(Math.random()*guesses.length)]}`,'bot');
  },8000);
},
drInit(){
  const cv=document.getElementById('draw-cv');
  if (!cv) { console.error('Canvas bulunamadı!'); return; }
  const ctx=cv.getContext('2d');
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,cv.width,cv.height);
  ctx.lineJoin='round'; ctx.lineCap='round';
  let down=false;
  cv.onmousedown=e=>{e.preventDefault();down=true;G.drPt(e,ctx,cv);};
  cv.onmouseup=cv.onmouseleave=()=>{down=false;ctx.beginPath();};
  cv.onmousemove=e=>{if(down)G.drPt(e,ctx,cv);};
  cv.ontouchstart=e=>{e.preventDefault();down=true;G.drPt(e.touches[0],ctx,cv);};
  cv.ontouchend=()=>{down=false;ctx.beginPath();};
  cv.ontouchmove=e=>{e.preventDefault();if(down)G.drPt(e.touches[0],ctx,cv);};
  cv.oncontextmenu=e=>e.preventDefault();
},
drPt(e,ctx,cv){
  const r=cv.getBoundingClientRect();
  const x=e.clientX-r.left,y=e.clientY-r.top;
  ctx.lineWidth=S.dr.size; ctx.strokeStyle=S.dr.color;
  ctx.lineTo(x,y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x,y);
},
drColor(el){
  S.dr.color=el.dataset.c;
  document.querySelectorAll('.clr-dot').forEach(d=>d.classList.remove('on'));
  el.classList.add('on');
},
drSize(el){
  S.dr.size=parseInt(el.dataset.s);
  document.querySelectorAll('.sz-btn').forEach(b=>b.classList.remove('on'));
  el.classList.add('on');
},
drClear(){
  const cv=document.getElementById('draw-cv');
  const ctx=cv.getContext('2d');
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,cv.width,cv.height);
},
drEnd(who,word){
  clearT();
  if(who){ addPts('you',80); addPts(who==='Ahmet'?'ahmet':'can',50); feed(`🎨 ${who} "${word}" buldu!`); }
  else{ addPts('you',20); feed(`⏱ Kimse bulamadı — "${word}"`); }
  wait(()=>G.final(),2000);
},

// ── FINAL ───────────────────────────────────
final(){
  clearT();
  show('final');
  const sorted=[
    {name:'Sen',pts:S.pts.you},
    {name:'Ahmet',pts:S.pts.ahmet},
    {name:'Can',pts:S.pts.can},
  ].sort((a,b)=>b.pts-a.pts);
  const medals=['🥇','🥈','🥉'];
  const champ=sorted[0];
  document.getElementById('fin-title').textContent=champ.name==='Sen'?'ŞAMPİYON!':'Kaybettin!';
  document.getElementById('fin-title').style.color=champ.name==='Sen'?'var(--accent)':'var(--muted)';
  document.getElementById('fin-sub').textContent=champ.name==='Sen'?'Tebrikler! Turnuvayı kazandın.':'Daha çok çalış!';
  document.getElementById('fin-podium').innerHTML=sorted.map((p,i)=>`
    <div class="podium-row${i===0?' first':''}">
      <div class="podium-rank">${medals[i]}</div>
      <div class="podium-name">${p.name}</div>
      <div class="podium-pts">${p.pts}</div>
    </div>
  `).join('');
  document.querySelectorAll('.right-sidebar, .left-sidebar').forEach(el=>el.style.display='none');
  document.getElementById('root').style.gridTemplateColumns='1fr';
}

}; // end G