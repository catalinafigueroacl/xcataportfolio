const projects = [
  {id:'grito', title:'GRITO SAGRADO', type:'Diseño infográfico', year:'2025', cat:'Editorial / Infografía', tools:'Illustrator / Photoshop / InDesign', cover:'grito-1.jpg', media:['grito-1.jpg','grito-2.jpg'], desc:'Infografía impresa que explica la relación entre el metal y el budismo a través de etapas del ciclo Samsara. Incluye rueda móvil y una composición visual intensa de símbolos, datos y narrativa.'},
  {id:'perfume', title:'EL PERFUME', type:'Libro objeto', year:'2025', cat:'Editorial / Objeto', tools:'Fotografía / Dirección de arte / Maqueta', cover:'perfume-2.jpg', media:['perfume-1.jpg','perfume-2.jpg','perfume-3.jpg','perfume-4.jpg','perfume-5.jpg','perfume-6.jpg'], desc:'Libro objeto inspirado en El Perfume. El proyecto trabaja la tensión entre lo bello y lo perturbador mediante materialidad, textura, cuerpo, sangre y ornamento.'},
  {id:'arbol', title:'ÁRBOL GENEALÓGICO', type:'Infografía', year:'2025', cat:'Infografía / Sistema visual', tools:'Illustrator / Investigación visual', cover:'arbol-ptolomeos.jpg', media:['arbol-ptolomeos.jpg'], desc:'Sistema infográfico que organiza visualmente la dinastía ptolemaica mediante jerarquías, color y composición vertical.'},
  {id:'samsa', title:'SAMSA', type:'Animación', year:'2025', cat:'Animación / Ilustración', tools:'Illustrator / After Effects / GIF', cover:'samsa-cover.jpg', media:['samsa.mp4','samsa-cover.jpg'], desc:'Proyecto animado de carácter experimental, basado en una figura híbrida y simbólica. La animación mantiene la pieza viva dentro del portafolio.'},
  {id:'nome100tobien', title:'NOME100TOBIEN', type:'Identidad visual', year:'2025', cat:'Identidad / Ilustración', tools:'Illustrator / Photoshop / Animación', cover:'nome100tobien.jpg', media:['nome100tobien-video.mp4','nome100tobien.jpg'], desc:'Proyecto visual de identidad y narrativa gráfica. La pieza mezcla territorio, color, símbolo y una estética saturada para construir un universo propio.'}
];
const $ = s => document.querySelector(s);
const makeCard = (p) => `<a href="#detalle-${p.id}" class="project-card tilt" data-id="${p.id}" aria-label="Abrir ${p.title}"><img src="img/${p.cover}" alt="${p.title}"><span class="card-text"><small>${p.type}</small><strong>${p.title}</strong></span></a>`;
function fillRows(){
  const top = projects.slice(0,3), bottom = projects.slice(3);
  $('#rowTop').innerHTML = [...top,...top,...top,...top].map(makeCard).join('');
  $('#rowBottom').innerHTML = [...bottom,...bottom,...bottom,...bottom].map(makeCard).join('');
  document.querySelectorAll('.project-card').forEach(card => card.addEventListener('click', e => { e.preventDefault(); openProject(card.dataset.id); }));
}
function mediaTag(src, cls=''){
  const ext = src.split('.').pop().toLowerCase();
  if(ext === 'mp4') return `<video class="${cls}" src="img/${src}" controls autoplay muted playsinline loop preload="metadata"></video>`;
  return `<img class="${cls}" src="img/${src}" alt="">`;
}
function openProject(id){
  const p = projects.find(x=>x.id===id); if(!p) return;
  $('#detalle').hidden = false;
  $('#detailCount').textContent = `${String(projects.indexOf(p)+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  $('#detailTitle').textContent = p.title; $('#detailType').textContent = p.type; $('#detailDescription').textContent = p.desc;
  $('#detailYear').textContent = p.year; $('#detailTools').textContent = p.tools; $('#detailCat').textContent = p.cat;
  $('#detailMedia').innerHTML = p.media.slice(0,6).map((m,i)=>mediaTag(m,i===0?'main-media':'')).join('');
  history.replaceState(null,'','#detalle');
  setTimeout(()=>$('#detalle').scrollIntoView({behavior:'smooth'}),50);
  observeReveals();
}
function observeReveals(){
 const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}
function mouseFX(){
 const dot = $('.cursor-dot');
 window.addEventListener('mousemove', e=>{
   if(dot){dot.style.left=e.clientX+'px'; dot.style.top=e.clientY+'px'}
   document.querySelectorAll('.parallax').forEach(el=>{
     const sp = Number(el.dataset.speed||10); const x=(e.clientX/window.innerWidth-.5)*sp; const y=(e.clientY/window.innerHeight-.5)*sp;
     el.style.translate = `${x}px ${y}px`;
   });
 });
 document.addEventListener('mousemove', e=>{
   document.querySelectorAll('.tilt:hover').forEach(card=>{
     const r=card.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5;
     card.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-5px)`;
   });
 });
 document.querySelectorAll('.tilt').forEach(el=>el.addEventListener('mouseleave',()=>el.style.transform=''));
}
fillRows(); observeReveals(); mouseFX();
