/* ============================================================
   CRIX TAG — script.js
   Everything you need to change is in the SETTINGS block below.
   ============================================================ */

const SETTINGS = {

  /* ---- COUNTDOWN ----
     Off by default. Set this to true when you know your date,
     and the countdown appears on the home page.                */
  countdownEnabled: false,

  /* The exact launch moment.
     Format: "YYYY-MM-DDTHH:MM:SS+10:00"
     +10:00 is Tasmania in winter, +11:00 during daylight saving.
     Example below is 1 June 2027 at 6pm.                       */
  releaseDate: "2027-06-01T18:00:00+10:00",

  /* The date shown above the counter.
     Leave as "" and it's written automatically from releaseDate.
     Or type your own, e.g. "Winter 2027".                       */
  releaseLabel: "",

  /* ---- STORE PAGE ----
     Where store.html gets its stock from.

     Right now it reads the local file store.json, so you can
     edit that by hand and push it.

     When the game can serve its own list, change this to the
     URL of that endpoint, e.g.
       "https://api.crixtag.com/store"
     It needs to return JSON in the same shape as store.json.   */
  storeSource: "store.json",

  /* ---- LINKS ---- */
  discordUrl: "https://discord.gg/MbQvJGDAst"

};

/* ============================================================
   Below here you shouldn't need to touch anything.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  setupDiscordLinks();
  hideMissingImages();
  setupCountdown();
  setupCarousel();
  setupStore();
});

/* ---- Discord buttons ---- */
function setupDiscordLinks(){
  if(!SETTINGS.discordUrl) return;
  document.querySelectorAll("[data-discord]").forEach(link => {
    link.href = SETTINGS.discordUrl;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

/* ---- Any image file you haven't added yet just disappears,
        instead of showing a broken icon. ---- */
function hideMissingImages(root = document){
  root.querySelectorAll("img[data-optional]").forEach(img => {
    img.addEventListener("error", () => img.remove());
    if(img.complete && img.naturalWidth === 0) img.remove();
  });
}

/* ---- Countdown ---- */
function setupCountdown(){
  const section = document.getElementById("countdown");
  if(!section || !SETTINGS.countdownEnabled) return;

  const target = new Date(SETTINGS.releaseDate).getTime();
  if(Number.isNaN(target)){
    console.warn("Crix Tag: releaseDate isn't a valid date, so the countdown stayed hidden.");
    return;
  }

  section.hidden = false;
  document.getElementById("cd-date").textContent =
    SETTINGS.releaseLabel || formatDate(target);

  const grid = document.getElementById("cd-grid");
  const live = document.getElementById("cd-live");
  const out = {
    days:  document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins:  document.getElementById("cd-mins"),
    secs:  document.getElementById("cd-secs")
  };

  tick();
  const timer = setInterval(tick, 1000);

  function tick(){
    const left = target - Date.now();
    if(left <= 0){
      clearInterval(timer);
      grid.hidden = true;
      live.hidden = false;
      return;
    }
    const s = Math.floor(left / 1000);
    out.days.textContent  = pad(Math.floor(s / 86400));
    out.hours.textContent = pad(Math.floor(s % 86400 / 3600));
    out.mins.textContent  = pad(Math.floor(s % 3600 / 60));
    out.secs.textContent  = pad(s % 60);
  }
}

/* ---- Map carousel ---- */
function setupCarousel(){
  const box = document.querySelector("[data-carousel]");
  if(!box) return;

  const slides = [...box.querySelectorAll("[data-slide]")];
  const dotBox = box.querySelector("[data-dots]");
  if(!slides.length) return;

  let index = 0;

  slides.forEach((slide, i) => {
    const counter = slide.querySelector("[data-count]");
    if(counter) counter.textContent = `${i + 1} of ${slides.length}`;

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Map ${i + 1}`);
    dot.addEventListener("click", () => show(i));
    dotBox.appendChild(dot);
  });

  const dots = [...dotBox.children];

  box.querySelector("[data-prev]").addEventListener("click", () => show(index - 1));
  box.querySelector("[data-next]").addEventListener("click", () => show(index + 1));

  box.addEventListener("keydown", e => {
    if(e.key === "ArrowLeft")  show(index - 1);
    if(e.key === "ArrowRight") show(index + 1);
  });
  box.tabIndex = 0;

  show(0);

  function show(next){
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const on = i === index;
      s.classList.toggle("on", on);
      s.setAttribute("aria-hidden", String(!on));
    });
    dots.forEach((d, i) => d.classList.toggle("on", i === index));
  }
}

/* ---- Store page ---- */
function setupStore(){
  const grid = document.getElementById("store-grid");
  if(!grid) return;

  const loading = document.getElementById("store-loading");
  const empty   = document.getElementById("store-empty");
  const failed  = document.getElementById("store-error");
  const stamp   = document.getElementById("store-stamp");
  const time    = document.getElementById("store-time");

  document.getElementById("store-retry").addEventListener("click", load);
  load();

  async function load(){
    show(loading);

    try{
      const res = await fetch(SETTINGS.storeSource, { cache: "no-store" });
      if(!res.ok) throw new Error(res.status);
      const data = await res.json();

      const items = Array.isArray(data) ? data : (data.items || []);
      if(!items.length){ show(empty); return; }

      grid.innerHTML = items.map(card).join("");
      hideMissingImages(grid);

      if(data.updated){
        time.textContent = new Date(data.updated).toLocaleString();
        stamp.hidden = false;
      }

      show(grid);
    }catch(err){
      console.warn("Crix Tag: couldn't load the store —", err);
      show(failed);
    }
  }

  function show(which){
    [loading, grid, empty, failed].forEach(el => el.hidden = el !== which);
  }

  function card(item){
    const img = item.image
      ? `<img src="${esc(item.image)}" alt="${esc(item.name)}" data-optional>`
      : "";
    const label = item.label
      ? `<span class="item-flag">${esc(item.label)}</span>` : "";
    const price = item.price != null
      ? `<p class="price">${esc(String(item.price))} Banana Bucks</p>` : "";

    return `
      <figure class="item">
        <div class="item-art">${label}${img}</div>
        <figcaption>
          <h3>${esc(item.name || "Unnamed item")}</h3>
          ${item.description ? `<p>${esc(item.description)}</p>` : ""}
          ${price}
        </figcaption>
      </figure>`;
  }
}

/* ---- helpers ---- */
function pad(n){
  return String(n).padStart(2, "0");
}

function formatDate(ms){
  return new Date(ms).toLocaleDateString(undefined, {
    day: "numeric", month: "long", year: "numeric"
  });
}

function esc(str){
  return String(str).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[c]);
}
