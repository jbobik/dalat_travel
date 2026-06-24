// Маршрут по Далату — данные. Карты строятся через Google Maps по названию места.
function enc(s){ return encodeURIComponent(s); }
function gmaps(gq){ return "https://www.google.com/maps/search/?api=1&query=" + enc(gq); }
function gphotos(q){ return "https://www.google.com/search?tbm=isch&q=" + enc(q); }
function commonsImg(fn,w){ return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(fn) + "?width=" + (w||820); }
function gDirAll(qs){ return "https://www.google.com/maps/dir/" + qs.map(enc).join("/"); }
function gEmbedRoute(qs){
  const daddr = qs.slice(1).map(enc).join("+to:");
  return "https://www.google.com/maps?saddr=" + enc(qs[0]) + "&daddr=" + daddr + "&hl=ru&output=embed";
}

const TRIP = {
  day1: {
    num: "1", date: "25 июня", title: "Знакомство с городом",
    subtitle: "Монастырь с золотым Буддой, стеклянный мост над сосновым лесом, мозаичная пагода, ужин и ночной рынок.",
    hero: "The Valley of Love in Dalat, Vietnam.jpg",
    points: [
      { n:1, name:"Le House DaLat", gq:"Le House Dalat, 124 Pham Ngoc Thach, Da Lat", addr:"124 Đường Phạm Ngọc Thạch, Phường 6", time:"11:30 · заселение ~12:00", dur:"≈ 30 мин", tag:"Старт", desc:"Приезд в Далат в 11:30, трансфер до отеля, заселение, оставить вещи и немного отдохнуть перед прогулкой." },
      { n:2, name:"Trang's Cookery", gq:"Trang's Cookery Restaurant, 211 Phan Dinh Phung, Da Lat", addr:"211 Phan Đình Phùng, Phường 2", time:"Обед · 12:30–13:25", dur:"≈ 55 мин", tag:"Еда", desc:"Первый приём пищи сразу после заселения — аутентичная вьетнамская кухня в центре города." },
      { n:3, name:"Thiền viện Vạn Hạnh", gq:"Thien Vien Van Hanh, 39 Phu Dong Thien Vuong, Da Lat", addr:"39 Đường Phù Đổng Thiên Vương, Phường 8", time:"13:40–14:15", dur:"≈ 35 мин", tag:"Достопримечательность", desc:"Дзен-монастырь с огромной статуей золотого Будды (~24 м) и панорамой. Вход свободный." },
      { n:4, name:"Стеклянный мост · Долина Любви", gq:"Thung Lung Tinh Yeu Valley of Love, Da Lat", imgs:["The Valley of Love in Dalat, Vietnam.jpg","DA LAT VALLEY OF LOVE VIETNAM JAN 2012 (6864593962).jpg","Thung Lung Tram Nam.JPG"], addr:"Thung lũng Tình Yêu, Mai Anh Đào, Phường 8", time:"14:30–16:15", dur:"≈ 1 ч 45 мин", tag:"Фотозона", big:true, desc:"Главная точка дня при дневном свете: стеклянный мост Ngắm Thông, 325 м над сосновым лесом, виды на Лангбианг. Заложено больше времени на прогулку и фотографии." },
      { n:5, name:"Linh Phước Pagoda", gq:"Linh Phuoc Pagoda, Trai Mat, Da Lat", imgs:["Linh Phuoc Pagoda, Dalat.jpg"], addr:"120 Tự Phước, Phường 11 (Trại Mát)", time:"16:55–17:35", dur:"≈ 40 мин", tag:"Достопримечательность", desc:"Мозаичная пагода из битого стекла и керамики: 49-метровый дракон и 7-ярусная башня. Вход свободный." },
      { n:6, name:"Ixora Homestay & Coffee", gq:"Ixora Homestay Coffee, 360 Tu Phuoc, Da Lat", addr:"360 Tự Phước, Phường 11", time:"17:40–18:10", dur:"≈ 30 мин", tag:"Кофе / фото", desc:"Фотогеничное кафе-хоумстей среди сосен, буквально рядом с пагодой Linh Phước — кофе и красивые кадры." },
      { n:7, name:"Crazy House", gq:"Crazy House, 3 Huynh Thuc Khang, Da Lat", imgs:["Hang Nga guesthouse 1.jpg","Hang Nga guesthouse 2.jpg"], addr:"03 Đ. Huỳnh Thúc Kháng, Phường 4", time:"18:45–19:15", dur:"≈ 30 мин", tag:"Достопримечательность", desc:"Сюрреалистичный дом-сказка: изогнутые лестницы, гроты и башни. ⚠ Закрывается ~19:00 — лучше зайти сюда по возвращении в центр, а ужинать после. Если сильно проголодались — наоборот: сначала Peace Bistro." },
      { n:8, name:"Peace Bistro", gq:"Peace Bistro, Da Lat", addr:"Yersin, Phường 10", time:"Ужин · 19:25–20:10", dur:"≈ 45 мин", tag:"Еда", desc:"Уютное европейское бистро — ужин после насыщенного дня. Порядок с Crazy House гибкий (см. заметку выше)." },
      { n:9, name:"Озеро Hồ Xuân Hương", gq:"Xuan Huong Lake, Da Lat", imgs:["Hồ Xuân Hương, Đà Lạt (2).JPG","Da Lat Panorama.JPG"], addr:"Hồ Xuân Hương, Phường 1", time:"Прогулка · ~20:15–21:15", dur:"вместе с рынком", tag:"Вечер", desc:"Вечерняя прогулка вокруг главного озера города: набережная, подсветка, кафе." },
      { n:10, name:"Da Lat Night Market", gq:"Cho Da Lat Night Market, Da Lat", imgs:["Dalat market, Vietnam.jpg","Vòng xoay chợ Đà Lạt.jpg"], addr:"Đường Nguyễn Thị Minh Khai, Phường 1", time:"~20:15–21:15", dur:"вместе с озером", tag:"Вечер", desc:"Ночной рынок: уличная еда, горячее соевое молоко, баньцео, сувениры и тёплая одежда." }
    ],
    legs: [
      {mode:"car",  mins:8,  note:""},
      {mode:"car",  mins:10, note:""},
      {mode:"car",  mins:12, note:"к Долине Любви"},
      {mode:"car",  mins:40, note:"длинный переезд на восток (Trại Mát)"},
      {mode:"walk", mins:3,  note:"кафе прямо рядом с пагодой"},
      {mode:"car",  mins:30, note:"возврат в центр"},
      {mode:"car",  mins:6,  note:"порядок Crazy House ↔ Peace Bistro гибкий"},
      {mode:"walk", mins:5,  note:""},
      {mode:"walk", mins:3,  note:""}
    ]
  },
  day2: {
    num: "2", date: "26 июня", title: "День среди природы",
    subtitle: "Ферма с видом на облака, канатка к монастырю, водопад Datanla с горными санями и глиняный туннель.",
    hero: "Zen Monastery Truc Lam Da Lat.JPG",
    points: [
      { n:1, name:"Le House DaLat", gq:"Le House Dalat, 124 Pham Ngoc Thach, Da Lat", addr:"124 Đường Phạm Ngọc Thạch, Phường 6", time:"8:00–9:00 · завтрак", dur:"≈ 1 ч", tag:"Старт", desc:"Завтрак, выселение. Все вещи (рюкзаки) берём с собой на весь день — возвращаться в отель не будем, вечером сразу автобус." },
      { n:2, name:"Đèo Mây Farm", gq:"Deo May Farm, Da Lat", addr:"Hẻm 32 Đ. 3/4, Phường 3", time:"9:30–10:15", dur:"≈ 45 мин", tag:"Кофе / виды", desc:"Ферма-кафе с видами на горы и облака — спокойный старт дня, кофе и фото." },
      { n:3, name:"Robin Hill Cable Car", gq:"Dalat Cable Car Robin Hill Station, Da Lat", addr:"Đồi Robin, Phường 3", time:"10:35–10:50", dur:"≈ 15 мин", tag:"Канатка", desc:"Станция канатной дороги на холме Робин (1517 м). Отсюда канатка 2,3 км спускается к монастырю Trúc Lâm." },
      { n:4, name:"Truc Lam Zen Monastery", gq:"Truc Lam Zen Monastery, Da Lat", imgs:["Zen Monastery Truc Lam Da Lat.JPG"], addr:"Trúc Lâm Yên Tử, Phường 3", time:"11:05–12:15", dur:"≈ 1 ч 10 мин", tag:"Фотозона", big:true, desc:"Крупнейший дзен-монастырь Вьетнама у озера Туйен Лам. Сюда приезжаешь по канатке (~12 мин), дальше пешком по живописной территории с садами и видом на озеро." },
      { n:5, name:"Datanla Falls + Alpine Coaster", gq:"Datanla Waterfall, Da Lat", imgs:["Thác Datanla, Đà Lạt.JPG","Thác Datanla.jpg"], addr:"QL20 Đèo Prenn, Phường 3", time:"12:55–14:40", dur:"≈ 1 ч 45 мин", tag:"Активность", desc:"Водопад в каньоне + спуск на alpine coaster (горные сани). Часть пути пешком по тропам. На территории есть кафе для перекуса." },
      { n:6, name:"Clay Tunnel", gq:"Clay Tunnel Da Lat, Duong Ham Dieu Khac", addr:"Đường hầm điêu khắc, Phường 4", time:"15:10–16:10", dur:"≈ 1 ч", tag:"Достопримечательность", desc:"Глиняный туннель скульптур у озера Туйен Лам: миниатюры истории Далата из красной глины." },
      { n:7, name:"Peace Bistro", gq:"Peace Bistro, Da Lat", addr:"Yersin, Phường 10", time:"Ужин · 18:00–18:30", dur:"≈ 30 мин · далее автобус", tag:"Финиш", desc:"Переезд в центр (~25 мин) + запас по времени. Ужин к 18:00–18:30 — успеваем поесть с рюкзаками и ждём отъезда на автобусе." }
    ],
    legs: [
      {mode:"car",   mins:12, note:""},
      {mode:"car",   mins:6,  note:""},
      {mode:"cable", mins:12, note:"канатная дорога Robin Hill → Trúc Lâm (~2,3 км)"},
      {mode:"car",   mins:15, note:""},
      {mode:"car",   mins:12, note:""},
      {mode:"car",   mins:25, note:"переезд в центр; есть запас времени до автобуса"}
    ]
  }
};
