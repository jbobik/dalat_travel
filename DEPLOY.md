# Как захостить сайт на Railway

Сайт — статический (HTML/CSS/JS). Карты и фото подгружаются из интернета, поэтому работают на любом хостинге.

## Вариант A. Railway через GitHub (рекомендуется)
1. Создай новый репозиторий на GitHub и загрузи туда **содержимое папки `dalat_site`** (файлы `index.html`, `day.html`, `app.js`, `data.js`, `styles.css`, `package.json`).
2. Зайди на https://railway.app → **New Project** → **Deploy from GitHub repo** → выбери репозиторий.
3. Railway сам определит Node-проект, выполнит `npm install` и запустит `npm start`
   (команда `serve` отдаёт статические файлы на порту `$PORT`).
4. В разделе **Settings → Networking → Generate Domain** получишь публичную ссылку — её и отправь родителям.

## Вариант B. Railway CLI (без GitHub)
```bash
npm i -g @railway/cli
cd dalat_site
railway login
railway init        # создать проект
railway up          # задеплоить текущую папку
railway domain      # выпустить публичный домен
```

## Локальная проверка перед деплоем
```bash
cd dalat_site
npx serve .
# открой http://localhost:3000
```
Или просто открой `index.html` двойным кликом (карты/фото требуют интернет).

## Заметки
- `package.json` уже настроен: `serve` слушает `0.0.0.0:$PORT`, который выдаёт Railway.
- Главная — `index.html` (выбор дня). День открывается как `day.html?day=1` и `day.html?day=2`.
- Если хочешь закрыть доступ через пару дней — просто удали проект в Railway или сними домен.
