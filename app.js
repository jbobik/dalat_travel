// Рендер дня на Google Maps embeds: обзор маршрута, карточки точек,
// и отдельная карта-маршрут между каждой парой точек.

function numClass(p){ return p.n===1 ? "num hotel" : (isFood(p) ? "num food" : "num"); }
function isFood(p){ return (p.tag||'').indexOf('Еда')>=0; }
function tagClass(p){
  if(p.big) return "tag big";
  if(isFood(p) || p.tag==="Кофе / фото" || p.tag==="Кофе / виды") return "tag food";
  if(p.tag==="Вечер") return "tag evening";
  return "tag";
}
function gEmbedRoute(qs){ // обзор: мультистоп-маршрут
  const daddr = qs.slice(1).map(enc).join("+to:");
  return "https://www.google.com/maps?saddr=" + enc(qs[0]) + "&daddr=" + daddr + "&hl=ru&output=embed";
}

function renderDay(key){
  const day=TRIP[key];
  document.getElementById('crumb').textContent=day.title;
  document.title="Маршрут Далат — "+day.title;

  const qs=day.points.map(p=>p.gq);
  const mealCount=day.points.filter(isFood).length;
  const intro=document.getElementById('intro');
  intro.innerHTML=`<h1>${day.title}</h1><p class="sub">${day.subtitle}</p>
    <div class="meta">
      <span>📍 ${day.points.length} точек</span>
      <span>🍽 приёмов пищи: ${mealCount}</span>
      <span>⏱ ${day.points[0].time.split('·')[0].trim()} → ${day.points[day.points.length-1].time}</span>
    </div>
    <a class="bigbtn" href="${gDirAll(qs)}" target="_blank">🚗 Открыть весь маршрут в Google Maps</a>
    <div class="mapwrap" id="overview"><iframe src="${gEmbedRoute(qs)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <p class="hint">Карта и метки — из Google Maps (геолокация по названию места). Кнопка выше строит весь маршрут одним нажатием.</p>`;

  const tl=document.getElementById('timeline');
  tl.innerHTML='';
  day.points.forEach((p,i)=>{
    const stop=document.createElement('div');
    stop.className='stop'+(p.big?' big':'');
    stop.innerHTML=`
      <div class="head">
        <div class="${numClass(p)}">${p.n}</div>
        <div class="hbody">
          <h3>${p.name}<span class="${tagClass(p)}">${p.tag}</span></h3>
          <div class="when"><span><b>🕒 ${p.time}</b></span><span class="dur">⏳ ${p.dur}</span></div>
          <div class="addr">📌 ${p.addr}</div>
        </div>
      </div>
      ${p.imgs&&p.imgs.length?`<div class="gal">${p.imgs.map(fn=>`<img src="${commonsImg(fn)}" loading="lazy" alt="${p.name}" onerror="this.remove()">`).join('')}</div>`:''}
      <div class="desc">${p.desc}</div>
      <div class="links">
        <a href="${gmaps(p.gq)}" target="_blank">📍 Открыть в Google Maps</a>
        <a href="${gmaps(p.gq)}" target="_blank">⭐ Фото и отзывы</a>
        <a href="${gphotos(p.name + ' Da Lat')}" target="_blank">📷 Картинки</a>
      </div>`;
    tl.appendChild(stop);

    if(i<day.points.length-1){
      const leg=day.legs[i], b=day.points[i+1];
      const modeTxt = leg.mode==="cable"?"🚠 канатка":(leg.mode==="walk"?"🚶 пешком":"🚕 такси");
      const cls = leg.mode==="cable"?"badge2 cable":(leg.mode==="walk"?"badge2 walk":"badge2");
      const wrap=document.createElement('div');
      wrap.className='leg';
      wrap.innerHTML=`
        <div class="lhdr">точка ${p.n} → ${b.n}: <span class="${cls}">${modeTxt} · ~${leg.mins} мин</span></div>
        <div class="mapwrap leg-map"><iframe src="${gEmbedDir(p.gq, b.gq)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        ${leg.note?`<div class="note-leg">${leg.note}</div>`:''}`;
      tl.appendChild(wrap);
    }
  });
}

(function(){
  const params=new URLSearchParams(location.search);
  const day=params.get('day')==='2'?'day2':'day1';
  renderDay(day);
})();
