// Рендер дня: интро со статистикой и картой-обзором, затем таймлайн точек с переездами.

function isFood(p){ return (p.tag||'').indexOf('Еда')>=0 || p.tag==='Финиш'; }

function tagColor(p){
  if(p.big) return "#c0552d";
  if(isFood(p)) return "#b5762a";
  if(p.tag==="Вечер") return "#5a4f9c";
  if(p.tag==="Кофе / фото" || p.tag==="Кофе / виды") return "#b5762a";
  if(p.tag==="Канатка") return "#1d7d7d";
  if(p.tag==="Активность") return "#2f7d4a";
  if(p.tag==="Старт") return "#1c4032";
  return "#2f5d4a";
}
function numColor(p){
  if(p.n===1) return "#1c4032";
  if(p.big) return "#c0552d";
  if(isFood(p)) return "#b5762a";
  if(p.tag==="Вечер") return "#5a4f9c";
  return "#2f5d4a";
}

function renderDay(key){
  const d = TRIP[key];
  document.title = "Маршрут Далат — день " + d.num + " · " + d.title;

  const qs = d.points.map(p=>p.gq);
  const meals = d.points.filter(isFood).length;

  const wrap = document.getElementById('daywrap');
  wrap.innerHTML = `
    <div class="eyebrow">День ${d.num} · ${d.date}</div>
    <h1>${d.title}</h1>
    <p class="sub">${d.subtitle}</p>
    <div class="statbar">
      <div class="stat"><b>${d.points.length}</b><span>точек</span></div>
      <div class="stat"><b>${meals}</b><span>приёмов пищи</span></div>
      <div class="stat"><b>${d.date}</b><span>дата</span></div>
      <a class="routebtn" href="${gDirAll(qs)}" target="_blank" rel="noopener">Весь маршрут на карте →</a>
    </div>
    <div class="mapframe"><iframe src="${gEmbedRoute(qs)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <p class="hint">Карта и метки — Google Maps по названию места. Для отображения нужен интернет.</p>
    <div class="timeline" id="timeline"></div>`;

  const tl = document.getElementById('timeline');
  d.points.forEach((p,i)=>{
    const last = i === d.points.length-1;
    const stop = document.createElement('div');
    stop.className = 'row';
    stop.innerHTML = `
      <div class="rail">
        <div class="num" style="background:${numColor(p)}">${p.n}</div>
        ${last ? '' : '<div class="line"></div>'}
      </div>
      <div class="card${p.big?' big':''}">
        ${p.big ? '<div class="bigtag">★ Главная точка дня</div>' : ''}
        <div class="stophead">
          <h3>${p.name}</h3>
          <span class="tag" style="background:${tagColor(p)}">${p.tag}</span>
        </div>
        <div class="when"><span class="t">${p.time}</span><span class="dur">${p.dur}</span></div>
        <div class="addr">${p.addr}</div>
        ${p.imgs&&p.imgs.length ? `<div class="gal scrl">${p.imgs.map(fn=>`<img src="${commonsImg(fn)}" loading="lazy" alt="${p.name}" onerror="this.remove()">`).join('')}</div>` : ''}
        <p class="desc">${p.desc}</p>
        <div class="links">
          <a href="${gmaps(p.gq)}" target="_blank" rel="noopener">Открыть в Google Maps</a>
          <a href="${gphotos(p.name + ' Da Lat')}" target="_blank" rel="noopener">Фото и виды</a>
        </div>
      </div>`;
    tl.appendChild(stop);

    if(!last){
      const leg = d.legs[i], b = d.points[i+1];
      const modeName = leg.mode==="cable" ? "Канатка" : (leg.mode==="walk" ? "Пешком" : "Такси");
      const cls = leg.mode==="cable" ? "legchip cable" : (leg.mode==="walk" ? "legchip walk" : "legchip");
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `
        <div class="rail leg"><div class="dash"></div></div>
        <div class="legbody">
          <span class="${cls}">${p.n} → ${b.n}  ·  ${modeName} · ~${leg.mins} мин</span>
          ${leg.note ? `<span class="legnote">${leg.note}</span>` : ''}
        </div>`;
      tl.appendChild(row);
    }
  });
}

(function(){
  const params = new URLSearchParams(location.search);
  const key = params.get('day')==='2' ? 'day2' : 'day1';
  renderDay(key);
})();
